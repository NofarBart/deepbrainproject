# run on new video
import sys
import deeplabcut

ONE = 1
TWO = 2
shuffle = ONE

# retrieve command-line arguments
path_config_file = sys.argv[ONE]
# path_config_file = 'C:\Experiment10-Tester10-2024-02-13\config.yaml'

#EDIT: let's check a specific video (PLEASE EDIT VIDEO PATH):
Specific_videofolder = sys.argv[TWO]
# Specific_videofolder = 'C:\Experiment10-Tester10-2024-02-13\\videos\\vid1.mp4'

# #don't edit:
# deeplabcut.create_video_with_all_detections(path_config_file, [Specific_videofile], shuffle=shuffle)
print("came (almost) all the way")

deeplabcut.create_labeled_video(path_config_file, [Specific_videofolder], videotype='.mp4', trailpoints=10, save_frames = True)
print("came all the way")

# deeplabcut.create_labeled_video(path_config_file,[Specific_videofolder], videotype='.mp4', keypoints_only=True)