'''
This file "csv_files.py" processes .h5 files in a specified directory, extracts position, velocity, and acceleration data
using the dlc2kinematics library (part of DeepLabCut),
and saves the data into CSV files in a specified output directory while maintaining the directory structure.
'''

import os
import dlc2kinematics
import sys
import pandas as pd
import subprocess

ONE = 1
TWO = 2
DF = "df_"
DF_VEL = "df_vel_"

# Set the directory containing the .h5 files
# Change the directory where you want to save the CSV files
output_directory = os.path.join(os.getcwd(), sys.argv[TWO])  # Change 'output_folder' to your desired output directory

# Get a list of all .h5 files in the directory
h5_directory = os.path.join(os.getcwd(), sys.argv[ONE])

subprocess.run(["python", "deeplabcut\create_dir_hierarchy.py", h5_directory, output_directory])

h5_files = [file for file in os.listdir(h5_directory) if file.endswith('.h5')]

# Function to rename columns
def rename_columns(df):
    new_columns = []
    for col in df.columns:
        if isinstance(col, tuple) and len(col) == 3:
            new_columns.append((col[1], col[2]))
        else:
            new_columns.append(col)
    df.columns = pd.MultiIndex.from_tuples(new_columns) if isinstance(df.columns, pd.MultiIndex) else new_columns
    return df

# Loop through each .h5 file
for h5_file in h5_files:
    # Construct the full path to the .h5 file
    h5_path = os.path.join(h5_directory, h5_file)

    # Load data from the .h5 file
    df, bodyparts, scorer = dlc2kinematics.load_data(h5_path)
    df_vel_bodypart = dlc2kinematics.compute_velocity(df, bodyparts=['all'], filter_window=3, order=1)
    df_acc_bodypart = dlc2kinematics.compute_acceleration(df, bodyparts=['all'])

    # Rename columns
    df = rename_columns(df)
    df_vel_bodypart = rename_columns(df_vel_bodypart)
    df_acc_bodypart = rename_columns(df_acc_bodypart)

    # Generate CSV file names based on the .h5 file name
    csv_filename = h5_file.replace('.h5', '_pos_data.csv')
    csv_vel_filename = h5_file.replace('.h5', '_vel_data.csv')
    csv_acc_filename = h5_file.replace('.h5', '_acc_data.csv')

    # Change the directory where you want to save the CSV files
    csv_path = os.path.join(output_directory, csv_filename)
    csv_vel_path = os.path.join(output_directory, csv_vel_filename)
    csv_acc_path = os.path.join(output_directory, csv_acc_filename)

    df_file_path = pd.DataFrame({'File Path': [output_directory] * len(df)})

    # Check if the CSV file already exists
    if not os.path.isfile(csv_path):
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

    # Check if df_acc_bodypart_data.csv already exists
    if not os.path.isfile(csv_acc_path):
        df_acc_bodypart_final = pd.concat([df_file_path, df_acc_bodypart.reset_index(drop=False)], axis=1)
        df_acc_bodypart_final.to_csv(csv_acc_path, index=False)
        print(f'{csv_acc_path} saved successfully.')
    else:
        print(f'{csv_acc_path} already exists. Skipping saving operation.')