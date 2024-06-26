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
from dlc2kinematics import Visualizer2D
import matplotlib.pyplot as plt
import cv2
import sys
import os
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
# video_path = "D:\\testing_videos_new\\vid3.mp4"
# config = 'C:\Experiment16-Tester16-2024-02-21\config.yaml'
config = os.path.join(os.getcwd(),sys.argv[ONE])
video_path = os.path.join(os.getcwd(),sys.argv[TWO])
print("config path is: ", config)
print("video dir path is: ", video_path)
# h5 = 'C:\Experiment16-Tester16-2024-02-21\\videos\\vid2DLC_resnet50_Experiment16Feb21shuffle1_7800.h5'

print("start analyzing videos...")
deeplabcut.analyze_videos(config,[video_path], videotype=VideoType)
deeplabcut.create_labeled_video(config, [video_path], videotype=VideoType, trailpoints=5, save_frames = True)
# print("start labeling videos...")
# deeplabcut.create_labeled_video(config,[video_path])
print("start plotting...")
deeplabcut.plot_trajectories(config,[video_path],showfigures=False, videotype=VideoType)

# deeplabcut.create_labeled_video(config, [video_path], videotype='.mp4', trailpoints=10, save_frames = True)


# # get fps of video:

# # Open the video file
# video_capture = cv2.VideoCapture(video_path)

# # Get the frames per second (fps) of the video
# fps = video_capture.get(cv2.CAP_PROP_FPS)

# # Release the video capture object
# video_capture.release()

# print("Frames per second (fps):", fps)


# def frame_to_time(frame_number, fps):
#     return frame_number / fps

# df, bodyparts, scorer = dlc2kinematics.load_data(h5)
# # path of the h5 file inside videos library of the DLC project

# # print('error is not here')
# # viz = Visualizer2D(config, h5)
# # viz.view(show_axes=True, show_grid=True)

# df_vel = dlc2kinematics.compute_velocity(df,bodyparts=['all'], filter_window=THREE, order=ONE)
# # print("df val is:\n", df_vel)
# df_speed = dlc2kinematics.compute_speed(df,bodyparts=['right_back_leg'], filter_window=THREE, order=ONE)
# print("df speed is:\n", df_speed)
# # print("df speed is:\n", df_speed)

# df_vel_bodypart = dlc2kinematics.compute_velocity(df,bodyparts=['right_back_leg'], filter_window=THREE, order=ONE)
# df_vel_bodypart
# print("df tail val is:\n", df_vel_bodypart)
# dlc2kinematics.plot_velocity(df[scorer]['right_back_leg'], df_vel_bodypart, start=ZERO, end=END)

# print("first val is:\n", df[scorer]['right_back_leg'])
# print("second val is:\n", df_vel_bodypart)


# # # Assuming 'scorer', 'bodyparts', and 'coords' are the levels of the MultiIndex
# # # Access the velocity values for the 'tail' body part
# velocity_values = df_vel_bodypart[(scorer, 'right_back_leg', 'x')]
# print(velocity_values)

# # Initialize a list to store tuples of (index, value) for values higher than THRESHOLD or smaller than -THRESHOLD
# extreme_positive_values = []
# extreme_negative_values = []

# # Initialize number of frames list
# frames_num = []

# # Iterate through the values in the Series
# for index, value in velocity_values.items():
#     # Check if the value is higher than THRESHOLD or smaller than -THRESHOLD
#     if value > THRESHOLD:
#         extreme_positive_values.append((index, value))
#     elif  value <= -THRESHOLD:
#         extreme_negative_values.append((index, value))

# # Print the extreme values
# # print("Extreme values (higher than THRESHOLD or smaller than -THRESHOLD):")
# # for index, value in extreme_positive_values:
# #     print("Index:", index, "| Value:", value)

# # print("\n\n\n\nnow the opposite direction\n\n\n\n")

# # for index, value in extreme_negative_values:
# #     print("Index:", index, "| Value:", value)

# # Initialize variables to track comparisons
# positive_index = ZERO
# negative_index = ZERO
# save_first_frame = ZERO
# save_last_frame = ZERO
# flag = ZERO
# # Iterate until both lists have been exhausted
# while positive_index < (len(extreme_positive_values)) and negative_index < (len(extreme_negative_values)):
    
#     # Get the indices of the current items in both lists
#     current_positive_index = extreme_positive_values[positive_index][ZERO]
#     if positive_index < (len(extreme_positive_values)-ONE):
#         next_positive_index = extreme_positive_values[positive_index+ONE][ZERO]
#     current_negative_index = extreme_negative_values[negative_index][ZERO]
#     if negative_index < (len(extreme_negative_values)-ONE):
#         next_negative_index = extreme_negative_values[negative_index+ONE][ZERO]

#     # Compare the indices
        
#     # Movement
#     if current_positive_index < current_negative_index:
#         # Ends
#         if next_positive_index > current_negative_index:
#             print("Positive index {} negative index {}. Movement began and ended.".format(current_positive_index, current_negative_index))
#             if save_first_frame == ZERO or flag == ZERO:
#                 save_first_frame = current_positive_index
#                 # print("\nentered zero if, current_positive_index is: \n", current_positive_index)
#             save_last_frame = current_negative_index
#             frames_num.append(save_last_frame - save_first_frame)
#             flag = ZERO
#             positive_index += ONE
#             negative_index += ONE
#         # Continues
#         elif next_positive_index < current_negative_index:
#             print("Positive index {} negative index {}. Movement keeps going.".format(current_positive_index, current_negative_index))
#             if flag == ZERO:
#                 save_first_frame = current_positive_index
#                 flag = ONE
#             # print("\n\n\n\nentered , current_positive_index is: \n\n\n\n", current_positive_index)
#             positive_index += ONE
#     # No movement
#     else:
#         print("Positive index {} negative index {}. Movement ended.".format(current_positive_index, current_negative_index))
#         negative_index += ONE

# # Check if there are remaining items in either list
# while positive_index < len(extreme_positive_values):
#     print("No corresponding negative index for positive index, problem", extreme_positive_values[positive_index][ZERO])
#     positive_index += ONE

# while negative_index < len(extreme_negative_values):
#     print("No corresponding positive index for negative index, movement ended", extreme_negative_values[negative_index][ZERO])
#     negative_index += ONE

# print("frame numbers are: ", frames_num)

# average = sum(frames_num) / len(frames_num)
# print("Average:", average)

# time = frame_to_time(average, fps)
# print("Time (seconds) corresponding to frame", average, ":", time)

# # # #don't edit:
# # # deeplabcut.create_video_with_all_detections(path_config_file, [Specific_videofile], shuffle=shuffle)
# # print("came (almost) all the way")

# # deeplabcut.create_labeled_video(path_config_file, [Specific_videofolder], videotype='.mp4', trailpoints=10, save_frames = True)
# # print("came all the way")

# # deeplabcut.create_labeled_video(path_config_file,[Specific_videofolder], videotype='.mp4', keypoints_only=True)

