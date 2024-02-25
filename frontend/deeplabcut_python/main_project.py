# rest of the code in deeplabcut

import napari
import deeplabcut
import os

ZERO = 0
ONE = 1
TWO =2
DIS_ITERS = 10
SAVE_ITERS = 100
MAX_ITERS = 500

shuffle = ONE # edit if needed; 1 is the default.
tracktype= 'ellipse' # box, skeleton, ellipse
VideoType = 'mp4' # mp4, MOV, or avi, whatever you uploaded!

# deeplabcut.create_new_project("trying", "nofar", r'D:\\testing_videos_new2\\vid1.mp4', working_directory = 'C:\\', copy_videos=True, multianimal=False)

# retrieve command-line arguments
path_config_file = os.path.join(os.getcwd(),'C:\Experiment16-Tester16-2024-02-21\config.yaml')
# path_config_file = sys.argv[ONE]
# videofile_path  = sys.argv[TWO]
videofile_path = os.path.join(os.getcwd(),'C:\Experiment16-Tester16-2024-02-21\\videos')

# # # path_config_file = 'C:\Experiment10-Tester10-2024-02-13\config.yaml'
# # # videofile_path  = 'C:\Experiment10-Tester10-2024-02-13\\videos'

# Modify the configuration
cfg = deeplabcut.auxiliaryfunctions.read_config(path_config_file)

# Define hierarchical structure for body parts
cfg["bodyparts"] = ["right_front_leg",
    "right_back_leg",
    "left_front_leg",
    "left_back_leg",
    "tail",
    "tongue"]

cfg["skeleton"] = []

cfg['pcutoff']=0.1

cfg['batch_size']=4

# # # Update the TrainingFraction parameter
# # # cfg["TrainingFraction"] = "0.83"

# Write the modified configuration back to the config file
deeplabcut.auxiliaryfunctions.write_config(path_config_file, cfg)

with napari.gui_qt():
    # viewer = napari.Viewer()
    deeplabcut.label_frames(path_config_file)

# # deeplabcut.load_demo_data(path_config_file)

deeplabcut.check_labels(path_config_file)

# # if you labeled on Windows, please set the windows2linux=True:
# # what for??
deeplabcut.create_training_dataset(path_config_file, augmenter_type='imgaug')

# # maxiters=75000
# # , maxiters=MAX_ITERS, allow_growth=True
deeplabcut.train_network(path_config_file, shuffle=shuffle, displayiters=DIS_ITERS,saveiters=SAVE_ITERS)

# ,Shuffles=[shuffle]
# let's evaluate first:
deeplabcut.evaluate_network(path_config_file, plotting=False)

# # # plot a few scoremaps:
# # deeplabcut.extract_save_all_maps(path_config_file, shuffle=shuffle, Indices=[ZERO])

# # , shuffle=shuffle, videotype=VideoType
deeplabcut.analyze_videos(path_config_file,[videofile_path])

deeplabcut.create_labeled_video(path_config_file,[videofile_path])

deeplabcut.plot_trajectories(path_config_file,[videofile_path],showfigures=True)

# """For checking only!!"""
# #EDIT: let's check a specific video (PLEASE EDIT VIDEO PATH):
# Specific_videofile = 'C:\Experiment9-Tester9-2024-02-11\\videos\\testing_video'
# #don't edit:
# deeplabcut.create_video_with_all_detections(path_config_file, [Specific_videofile], shuffle=shuffle)
# """End of checking"""

# """Now let's filter the data to remove any small jitter:"""

# deeplabcut.filterpredictions(path_config_file,
#                                  videofile_path,
#                                  shuffle=shuffle,
#                                  videotype=VideoType,
#                                  track_method = tracktype)

# """## Create plots of your trajectories:"""

# deeplabcut.plot_trajectories(path_config_file, videofile_path, videotype=VideoType, shuffle=shuffle, track_method=tracktype)

# print("finished main project file!")
# # Call the Python script with arguments
# subprocess.run(["python", "complete_network_code.py", path_config_file, videofile_path])