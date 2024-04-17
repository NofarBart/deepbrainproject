import deeplabcut
import sys

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

# Retrieve command-line arguments
path_config_file = sys.argv[ONE]

# Modify the configuration
cfg = deeplabcut.auxiliaryfunctions.read_config(path_config_file)

# Define hierarchical structure for body parts
body_parts = cfg["bodyparts"]

# Return body parts
print(body_parts)  # This will print the body parts defined in your configuration