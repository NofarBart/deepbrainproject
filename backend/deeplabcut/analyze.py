# run on new video
'''
This file calculates (time) beginning and end of average movement in a given video,
of selected bodypart, in x or y.
It uses the fps parameter and dlc2kinematics library to extract velocities (speed with directions)
and determain wheter there was movement.
Positive velocities meaning the mouse run (in x) and negative that it stopped (the wheel is moving but mouse isn't
or at least that the leg if chosen is finishing movement- is moving back).
'''
# import sys
import deeplabcut
import dlc2kinematics
import pandas as pd
from dlc2kinematics import Visualizer2D, Visualizer3D
import matplotlib.pyplot as plt
from matplotlib.pyplot import cm
import os
import numpy as np
import pandas as pd
import sys
import cv2
import mpld3
import plotly.graph_objs as go
from plotly.tools import mpl_to_plotly
import time_in_each_roi #the function needs to be in the same folder as the notebook
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
import keras
ZERO = 0
ONE = 1
TWO = 2
THREE = 3
END = 100 # End of frames in x (in graph) 
THRESHOLD = 50
shuffle = ONE
VideoType = 'mp4'


# Path to the video file
h5 = os.path.join(os.getcwd(),sys.argv[ONE])
bpt = sys.argv[TWO]


df, bodyparts, scorer = dlc2kinematics.load_data(h5)

df_vel_bodypart = dlc2kinematics.compute_velocity(df,bodyparts=[bpt], filter_window=THREE, order=ONE)
df_vel_bodypart



# Compute the average of 'x' values
average_x = df[scorer][bpt]['x'].median()
# Compute the average of 'x' values
average_y = df[scorer][bpt]['y'].median()

# Print the average
print("Average of 'x' values:", average_x)
# Print the average
print("Average of 'y' values:", average_y)

for index, value in df_vel_bodypart[(scorer, bpt, 'x')].items():
# Apply the condition to set the values in df[scorer][bpt] to zero based on velocity criteria
    if (df_vel_bodypart.loc[index, (scorer, bpt, 'x')] > 30) or (df_vel_bodypart.loc[index, (scorer, bpt, 'x')] < -30):
        df_vel_bodypart.loc[index, (scorer, bpt, 'x')] = 0
        df_vel_bodypart.loc[index, (scorer, bpt, 'y')] = 0
    if (df_vel_bodypart.loc[index, (scorer, bpt, 'y')] > 50) or (df_vel_bodypart.loc[index, (scorer, bpt, 'y')] < -50):
        df_vel_bodypart.loc[index, (scorer, bpt, 'x')] = 0
        df_vel_bodypart.loc[index, (scorer, bpt, 'y')] = 0
        # df.loc[index, (scorer, bpt, 'x')] = 200
for index, value in df[scorer][bpt]['x'].items():
# Apply the condition to set the values in df[scorer][bpt] to zero based on velocity criteria
    if ((df.loc[index, (scorer, bpt, 'x')] > 330)):
        # df_vel_bodypart.loc[index, (scorer, bpt, 'x')] = 0
        # df_vel_bodypart.loc[index, (scorer, bpt, 'y')] = 0
        if (index > 2):
            df.loc[index, (scorer, bpt, 'x')] = df.loc[index - 2, (scorer, bpt, 'x')]
            df.loc[index, (scorer, bpt, 'y')] = df.loc[index - 2, (scorer, bpt, 'y')]

print(df[scorer][bpt])

########################
#plot 1
########################
#Set the size of the matplotlib canvas
fig = plt.figure(figsize = (18,8))

def velocity():
    ax = df_vel_bodypart[ZERO:len(df_vel_bodypart)].plot(kind="line")    
    plt.xlabel("Frame numbers")
    plt.ylabel("velocity (AU)")
    ax.spines["right"].set_visible(False)
    ax.spines["top"].set_visible(False)
    plt.title("Computed Velocity", loc="left")
    plt.legend(loc='lower left', labels=['x', 'y', 'likelihood'])

velocity()
plt.savefig("../frontend/src/output1.jpg")
plt.close('all')
velocity()
plt.savefig("../frontend/public/output1.jpg")
########################
#Subplot 2
########################
# plt.subplot(1,3,2)

def position():
    ax1 = df[scorer][bpt][ZERO:len(df_vel_bodypart)].plot(kind="line")
    plt.xlabel("Frame numbers")
    plt.ylabel("position")
    ax1.spines["right"].set_visible(False)
    ax1.spines["top"].set_visible(False)
    plt.title("Loaded Position Data", loc="left")
    plt.legend(loc='lower left')
position()
plt.savefig("../frontend/src/output2.jpg")
plt.close('all')
position()
plt.savefig("../frontend/public/output2.jpg")
plt.close('all')

########################
#plot 3
########################
def walking_pattern():
    velocity_values = df_vel_bodypart[(scorer, bpt, 'x')]
    prev_value = velocity_values[ZERO]
    # prev_index = ZERO
    frame_start = ZERO
    frame_end = ZERO
    flag = ZERO
    color_forwards = iter(cm.Purples(np.linspace(0,1,len(velocity_values))))
    color_backwards = iter(cm.Greys(np.linspace(0,1,len(velocity_values))))

    # Go over the velocities, check if reaches zero:
    for index, value in velocity_values.items():
        c_f = next(color_forwards)
        c_b = next(color_backwards)
        # Check if the value is higher than zero and is the first nan-negative value (starting movement)
        if (value > prev_value and value >= ZERO and prev_value < ZERO):
            frame_start = index


            # If movement ended, plot the end of the prev. movement as the start of the new
            # When flag is one or (frame_start - frame_end) is smaller than 5 it is a noise (false movement) 
            if (frame_end != ZERO and (frame_start - frame_end) > 5 and flag == ZERO):
                # Plot the end of the movement
                plt.plot(df[scorer][bpt]['x'][frame_end:frame_start - 3], -df[scorer][bpt]['y'][frame_end:frame_start - 3], color = c_b)
        # Define as false movement 
        if ((index - frame_start) <= 5):
            flag = ONE


        # Check if the value is smaller than zero and is the first nan-positive value (ending movement)
        elif (value < prev_value and value <= ZERO and prev_value > ZERO):
            flag = ZERO
            frame_end = index


        if (frame_start < frame_end):
        
    #    plt.plot(x, y, c=c)
            # Plot the start of the movement
            # c=next(color) #Change colour for each line in plot
            plt.plot(df[scorer][bpt]['x'][frame_start:frame_end], -df[scorer][bpt]['y'][frame_start:frame_end], color=c_f)
        prev_value = value
        # prev_index = index
    plt.title("Walking pattern of the mouse")
    plt.xlabel("x location [AU]")
    plt.ylabel("y location [AU]")
# plt.savefig("../frontend/public/output3.jpg")
walking_pattern()
plt.savefig("../frontend/src/output3.jpg")
plt.close('all')
walking_pattern()
plt.savefig("../frontend/public/output3.jpg")
plt.close('all')
# plotly_fig = mpl_to_plotly(fig)  # Convert Matplotlib figure to Plotly

# # Save the Plotly graph as JSON or image
# plotly_fig_json = plotly_fig.to_json()