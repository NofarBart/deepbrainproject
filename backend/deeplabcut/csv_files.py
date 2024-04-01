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
# video_path = "D:\\testing_videos_new\\vid2.mp4"
# config = 'C:\Experiment16-Tester16-2024-02-21\config.yaml'
# h5 = 'C:\Experiment18-Tester18-2024-02-29\\videos\\vid1DLC_resnet50_Experiment18Feb29shuffle1_20000.h5'
h5 = 'C:\\current\\Test_Blue_2024-03-27-124054-0000DLC_resnet50_Experiment11Mar25shuffle1_72600.h5'

df, bodyparts, scorer = dlc2kinematics.load_data(h5)
df_vel_bodypart = dlc2kinematics.compute_velocity(df,bodyparts=['all'], filter_window=THREE, order=ONE)

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