import os
import dlc2kinematics
import sys
import pandas as pd

ONE = 1
DF = "df_"
DF_VEL = "df_vel_"

# Set the directory containing the .h5 files
h5_directory = os.path.join(os.getcwd(),sys.argv[ONE])

# Get a list of all .h5 files in the directory
h5_files = [file for file in os.listdir(h5_directory) if file.endswith('.h5')]

# Loop through each .h5 file
for h5_file in h5_files:
    # Construct the full path to the .h5 file
    h5_path = os.path.join(h5_directory, h5_file)

    # Load data from the .h5 file
    df, bodyparts, scorer = dlc2kinematics.load_data(h5_path)
    df_vel_bodypart = dlc2kinematics.compute_velocity(df, bodyparts=['all'], filter_window=3, order=1)

    # Generate CSV file names based on the .h5 file name
    csv_filename = h5_file.replace('.h5', '_data.csv')
    csv_vel_filename = h5_file.replace('.h5', '_vel_data.csv')
     
    csv_path = os.path.join(h5_directory, csv_filename)
    # csv_path_new = os.path.join(DF, csv_path)
    csv_vel_path = os.path.join(h5_directory, csv_vel_filename)
    # csv_vel_path_new = os.path.join(DF_VEL, csv_vel_path)
    df_file_path = pd.DataFrame({'File Path': [h5_directory] * len(df)})

    # Check if the CSV file already exists
    if not os.path.isfile(csv_path):
        # Create a DataFrame with the file path as the first row
        # Concatenate the two DataFrames
        df_final = pd.concat([df_file_path, df.reset_index(drop=False)], axis=1)
        df_final.to_csv(csv_path, index=False)
        print(f'{csv_path} saved successfully.')
    else:
        print(f'{csv_path} already exists. Skipping saving operation.')

    # Check if df_vel_bodypart_data.csv already exists
    if not os.path.isfile(csv_vel_path):
        df_vel_bodypart_final = pd.concat([df_file_path, df_vel_bodypart.reset_index(drop=False)], axis=1)
        df_vel_bodypart_final.to_csv(csv_vel_path, index=False)
        print(f'{csv_vel_path} saved successfully.')
    else:
        print(f'{csv_vel_path} already exists. Skipping saving operation.')








# # run on new video
# '''
# This file calculates (time) beginning and end of average movement in a given video,
# of selected bodypart, in x or y.
# It uses the fps parameter and dlc2kinematics library to extract velocities (speed with directions)
# and determain wheter there was movement.
# Positive velocities meaning the mouse run (in x) and negative that it stopped (the wheel is moving but mouse isn't
# or at least that the leg if chosen is finishing movement- is moving back).
# '''
# # import sys
# import deeplabcut
# import dlc2kinematics
# from dlc2kinematics import Visualizer2D, Visualizer3D
# import matplotlib.pyplot as plt
# from matplotlib.pyplot import cm
# import os
# import numpy as np
# import pandas as pd
# import cv2
# import time_in_each_roi #the function needs to be in the same folder as the notebook
# os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
# import keras
# ZERO = 0
# ONE = 1
# TWO = 2
# THREE = 3
# END = 100 # End of frames in x (in graph) 
# THRESHOLD = 50
# shuffle = ONE
# VideoType = 'mp4'


# # Path to the video file
# # video_path = "C:\Experiment16-Tester16-2024-02-21\\videos\\vid2.mp4"
# # video_path = "D:\\testing_videos_new\\vid2.mp4"
# # config = 'C:\Experiment16-Tester16-2024-02-21\config.yaml'
# # h5 = 'C:\Experiment18-Tester18-2024-02-29\\videos\\vid1DLC_resnet50_Experiment18Feb29shuffle1_20000.h5'
# h5 = 'C:\\current\\Test_Blue_2024-03-27-124054-0000DLC_resnet50_Experiment11Mar25shuffle1_72600.h5'

# df, bodyparts, scorer = dlc2kinematics.load_data(h5)
# df_vel_bodypart = dlc2kinematics.compute_velocity(df,bodyparts=['all'], filter_window=THREE, order=ONE)

# # Check if df_data.csv already exists
# if not os.path.isfile('df_data.csv'):
#     df.to_csv('df_data.csv', index=False)
#     print('df_data.csv saved successfully.')
# else:
#     print('df_data.csv already exists. Skipping saving operation.')

# # Check if df_vel_bodypart_data.csv already exists
# if not os.path.isfile('df_vel_bodypart_data.csv'):
#     df_vel_bodypart.to_csv('df_vel_bodypart_data.csv', index=False)
#     print('df_vel_bodypart_data.csv saved successfully.')
# else:
#     print('df_vel_bodypart_data.csv already exists. Skipping saving operation.')