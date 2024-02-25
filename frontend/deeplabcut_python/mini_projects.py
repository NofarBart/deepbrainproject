import deeplabcut
import os
import shutil
import subprocess

DIR = "D:\\testing_videos_new2" # for creating a new project for all files
TEMP_DIR = 'C:\\neural_network1' # temp directory for all mini projects
ZERO = 0
ONE = 1
MINUS_ONE = -1
PARADIGM = "Experiment16" # name of paradigm
TESTER = "Tester16" # name of the experimenter
FILES = os.listdir(DIR)
count = ONE

''' 
This file calls "say_yes.bat".
The goal is to automate the "deeplabcut.extract_frames" that demands yes typing from the user.

This is the file to run, using "python -i mini_projects.py" in cmd.

It creates mini projects (each containing one video),
calls the automation and unites all to the final, big project. 
'''

# function to delete the empty labeled_frames directory for each video,
# copy the labeled_frames directory and replace (cut).
def cut_and_paste_directory(source_directory, dest_directory):
    # Remove all directories and files within the destination directory
    if os.path.exists(dest_directory):
        shutil.rmtree(dest_directory)
    
    # Move the source directory to the destination directory
    shutil.move(source_directory, dest_directory)

# create temp directory with mini projects
os.mkdir(TEMP_DIR)

# take videos from a directory
for filename in FILES:
    # for each video:
    if filename.endswith(".mp4") or filename.endswith(".mov") or filename.endswith(".avi"): 
        name = PARADIGM + str(count)
        # create mini new project with the video
        path_config_file = deeplabcut.create_new_project(name, TESTER, [os.path.join(DIR, filename)], working_directory = TEMP_DIR, copy_videos=True, multianimal=False)
        # send to batch file to say automatic yes to every extract frames call
        result = subprocess.run(["C:\\Users\\nofar\\deeplabcut_python\\say_yes.bat", path_config_file], shell=True) # path where the batch file is stored\file_name.bat
        # prints for debugging:
        # print("STDOUT:", result.stdout)
        # print("STDERR:", result.stderr)
        count+=ONE
        continue
    else:
        continue



# List all files in the directory
video_files = [os.path.join(DIR, file) for file in os.listdir(DIR)]

# create new big project
config_file = deeplabcut.create_new_project(PARADIGM, TESTER, video_files, working_directory = 'C:\\', copy_videos=True, multianimal=False) # Has to have a video
substring_to_remove = "\config.yaml"
new_directory_path = config_file[:-len(substring_to_remove)] + "\labeled-data"

# loop over mini projects with the "cut_and_paste_directory" function =>
# "cut" directory from sub-project
# paste in the new directory of the whole NN, replacing the empty directory
# now we can have the frames from each file automatically

for project in os.listdir(TEMP_DIR):
    print(project)
    my_path = TEMP_DIR + "\\" + project + "\labeled-data"
    for video_dir in os.listdir(my_path):
        # prints for debugging:
        # print("source is: ", my_path + "\\" + video_dir)
        # print("dest is: ", new_directory_path + "\\" + video_dir)
        cut_and_paste_directory(my_path + "\\" + video_dir, new_directory_path + "\\" + video_dir)
        continue
    continue
if os.path.exists(TEMP_DIR):
        shutil.rmtree(TEMP_DIR)

# Call the Python script with arguments
        
print("finished mini projects file!")

subprocess.run(["python", "main_project.py",
                config_file, config_file[:-len(substring_to_remove)] + "\\videos"])