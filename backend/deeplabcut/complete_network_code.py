# run on new video
'''
This file creates labeled videos from given videos, and plots accordingly.
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
config = os.path.join(os.getcwd(),sys.argv[ONE])
video_path = os.path.join(os.getcwd(),sys.argv[TWO])
print("config path is: ", config)
print("video dir path is: ", video_path)

print("start analyzing videos...")
deeplabcut.analyze_videos(config,[video_path], videotype=VideoType)
deeplabcut.create_labeled_video(config, [video_path], videotype=VideoType, trailpoints=5, save_frames = True)

print("start plotting...")
deeplabcut.plot_trajectories(config,[video_path],showfigures=False, videotype=VideoType)

