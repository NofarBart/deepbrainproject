# run on new video
'''
This file calculates (time) beginning and end of average movement in a given video,
of selected bodypart, in x or y.
It uses the fps parameter and dlc2kinematics library to extract velocities (speed with directions)
and determain wheter there was movement.
Positive velocities meaning the mouse run (in x) and negative that it stopped (the wheel is moving but mouse isn't
or at least that the leg if chosen is finishing movement- is moving back).
'''
# imports
import dlc2kinematics
import matplotlib.pyplot as plt
from matplotlib.pyplot import cm
import os
import numpy as np
import sys
import time_in_each_roi #the function needs to be in the same folder as the notebook
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

# constants
ZERO = 0
ONE = 1
TWO = 2
THREE = 3
FOUR = 4
ZERO_STR = '0'
ONE_STR = '1'
TWO_STR = '2'
THREE_STR = '3'
END = 100 # End of frames in x (in graph) 
THRESHOLD = 50
IMG_PATH = "../frontend/src/images/"

# Get path to the h5 relevant file, to extract data
h5 = os.path.join(os.getcwd(),sys.argv[ONE])

# Get the specific bodypart to analyze
bpt = sys.argv[TWO]
# Get the specific bodypart to analyze
graph_generator = sys.argv[THREE]

print("graph_generator is: ",graph_generator)
# Get the specific bodypart to analyze
graph_title = sys.argv[FOUR]

print("graph_title is: ", graph_title)
# Load and seperate data
df, bodyparts, scorer = dlc2kinematics.load_data(h5)

# Use DLC2Kinematics function to compute velocity for the specific bodypart
df_vel_bodypart = dlc2kinematics.compute_velocity(df,bodyparts=[bpt], filter_window=THREE, order=ONE)
df_vel_bodypart

# Compute the average of 'x' values
average_x = df[scorer][bpt]['x'].mean()

print(average_x)
# Compute the average of 'x' values
average_y = df[scorer][bpt]['y'].median()

# Go over velocities of the bodypart in every frame
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
    if ((df.loc[index, (scorer, bpt, 'x')] > 1.5 * average_x)):
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
# fig = plt.figure(figsize = (18,8))


def velocity():
    ax = df_vel_bodypart.iloc[ZERO:len(df_vel_bodypart), ZERO:TWO].plot(kind="line")
    print("velocity ax is: ", ax) 
    plt.xlabel("Frame numbers")
    plt.ylabel("velocity (AU)")
    ax.spines["right"].set_visible(False)
    ax.spines["top"].set_visible(False)
    if graph_title == "something":
        plt.title("Computed Velocity " + bpt, loc="left")
    elif graph_title == "empty":
        plt.title(" " ,loc="left")
    else:
        # Check if at least one argument is provided (the script itself is sys.argv[0])
        if len(sys.argv) >= FOUR:
            # Join all command-line arguments after the script name (sys.argv[0])
            input_string = ' '.join(sys.argv[FOUR:])
            print("Input String:", input_string)
        else:
            print("No input provided.")
        plt.title(input_string, loc="left")
    plt.legend(loc='lower left', labels=['x', 'y', 'likelihood'])

if graph_generator == ZERO_STR or graph_generator == THREE_STR:
    print("entered velocity graph")
    velocity()
    plt.savefig(IMG_PATH + "output1.jpg")
    plt.close('all')
    velocity()
    plt.savefig("../frontend/public/output1.jpg")

########################
#plot 2
########################
# plt.subplot(1,3,2)

def position():
    ax1 = df[scorer][bpt].iloc[ZERO:len(df_vel_bodypart), ZERO:TWO].plot(kind="line")
    print("position ax1 is: ",ax1)
    plt.xlabel("Frame numbers")
    plt.ylabel("position")
    ax1.spines["right"].set_visible(False)
    ax1.spines["top"].set_visible(False)
    if graph_title == "something":
        plt.title("Loaded Position Data " + bpt, loc="left")
    elif graph_title == "empty":
        plt.title(" " ,loc="left")
    else:
        if len(sys.argv) >= FOUR:
            # Join all command-line arguments after the script name (sys.argv[0])
            input_string = ' '.join(sys.argv[FOUR:])
            print("Input String:", input_string)
        else:
            print("No input provided.")
        plt.title(input_string, loc="left")
    plt.legend(loc='lower left')

if graph_generator == ONE_STR or graph_generator == THREE_STR:
    print("entered position graph")
    position()
    plt.savefig(IMG_PATH + "output2.jpg")
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
    if graph_title == "something":
        plt.title("Moving pattern of the mouse " + bpt, loc="left")
    elif graph_title == "empty":
        plt.title(" " ,loc="left")
    else:
        if len(sys.argv) >= FOUR:
            # Join all command-line arguments after the script name (sys.argv[0])
            input_string = ' '.join(sys.argv[FOUR:])
            print("Input String:", input_string)
        else:
            print("No input provided.")
        plt.title(input_string, loc="left")
    plt.xlabel("x location [AU]")
    plt.ylabel("y location [AU]")

if graph_generator == TWO_STR or graph_generator == THREE_STR:
    print("entered walking pattern graph")
    walking_pattern()
    plt.savefig(IMG_PATH + "output3.jpg")
    plt.close('all')
    walking_pattern()
    plt.savefig("../frontend/public/output3.jpg")
    plt.close('all')