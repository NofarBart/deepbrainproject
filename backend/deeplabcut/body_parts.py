'''This file "body_parts.py" retrieves the body parts defined in a DeepLabCut configuration file.'''

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

# Retrieve command-line arguments
path_config_file = sys.argv[ONE]

# Modify the configuration
cfg = deeplabcut.auxiliaryfunctions.read_config(path_config_file)

# Define hierarchical structure for body parts
body_parts = cfg["bodyparts"]

# Return body parts
print(body_parts)  # This will print the body parts defined in your configuration