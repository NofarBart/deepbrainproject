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
from dlc2kinematics import Visualizer2D, Visualizer3D
import matplotlib.pyplot as plt
from matplotlib.pyplot import cm
import os
import numpy as np
import pandas as pd
import cv2
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
# video_path = "C:\Experiment16-Tester16-2024-02-21\\videos\\vid2.mp4"
video_path = "D:\\testing_videos_new\\vid2.mp4"
config = 'C:\Experiment16-Tester16-2024-02-21\config.yaml'
# h5 = 'C:\Experiment18-Tester18-2024-02-29\\videos\\vid1DLC_resnet50_Experiment18Feb29shuffle1_20000.h5'
h5 = 'C:\\current\\Test_Blue_2024-03-27-124054-0000DLC_resnet50_Experiment11Mar25shuffle1_72600.h5'

df, bodyparts, scorer = dlc2kinematics.load_data(h5)
# # Save df to CSV
# df.to_csv('df_data.csv', index=False)


bpt='right_back_Z'

df_vel = dlc2kinematics.compute_velocity(df,bodyparts=['all'], filter_window=THREE, order=ONE)
# print("df val is:\n", df_vel)
df_speed = dlc2kinematics.compute_speed(df,bodyparts=[bpt], filter_window=THREE, order=ONE)
# print("df speed is:\n", df_speed)
# print("df speed is:\n", df_speed)

df_vel_bodypart = dlc2kinematics.compute_velocity(df,bodyparts=[bpt], filter_window=THREE, order=ONE)
df_vel_bodypart

# Check if df_data.csv already exists
if not os.path.isfile('df_data.csv'):
    df.to_csv('df_data.csv', index=False)
    print('df_data.csv saved successfully.')
else:
    print('df_data.csv already exists. Skipping saving operation.')

# Check if df_vel_bodypart_data.csv already exists
if not os.path.isfile('df_vel_bodypart_data.csv'):
    df_vel_bodypart.to_csv('df_vel_bodypart_data.csv', index=False)
    print('df_vel_bodypart_data.csv saved successfully.')
else:
    print('df_vel_bodypart_data.csv already exists. Skipping saving operation.')
# print("df val is:\n", df_vel_bodypart)
# dlc2kinematics.plot_velocity(df[scorer]['right_back_Z'], df_vel_bodypart, start=1700, end=1900)
dlc2kinematics.plot_velocity(df[scorer][bpt], df_vel_bodypart)

#let's calculate velocity of the snout

vel = time_in_each_roi.calc_distance_between_points_in_a_vector_2d(np.vstack([df[scorer][bpt]['x'].values.flatten(), df[scorer][bpt]['y'].values.flatten()]).T)

fps=120 # frame rate of camera in those experiments
time=np.arange(len(vel))*1./fps
vel=vel #notice the units of vel are relative pixel distance [per time step]

# store in other variables:
xleg=df[scorer][bpt]['x'].values
yleg=df[scorer][bpt]['y'].values
vleg=vel
plt.plot(time,vel*1./fps)
plt.xlabel('Time in seconds')
plt.ylabel('Speed in pixels per second')
plt.show()
# print("first val is:\n", df[scorer]['right_back_Z']['x'])
# print("second val is:\n", df_vel_bodypart)

# 1840:1870, 

# plt.plot(df[scorer]['right_back_Z']['x'][1880:1920], -df[scorer]['right_back_Z']['y'][1880:1920], 'r-')
# # plt.axis((1840, 1880, 1840, 1880))
# plt.show()



velocity_values = df_vel_bodypart[(scorer, 'right_back_Z', 'x')]
prev_value = velocity_values[ZERO]
# prev_index = ZERO
frame_start = ZERO
frame_end = ZERO
flag = ZERO
color_forwards = iter(cm.BuGn(np.linspace(0,1,len(velocity_values))))
color_backwards = iter(cm.OrRd(np.linspace(0,1,len(velocity_values))))

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
            plt.plot(df[scorer]['right_back_Z']['x'][frame_end:frame_start - 3], -df[scorer]['right_back_Z']['y'][frame_end:frame_start - 3], color = c_b)
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
        plt.plot(df[scorer]['right_back_Z']['x'][frame_start:frame_end], -df[scorer]['right_back_Z']['y'][frame_start:frame_end], color=c_f)
    prev_value = value
    # prev_index = index
plt.show()