import os
import sys
ONE = 1
TWO = 2

def create_subdirs(src, dest):
    for root, dirs, files in os.walk(src):
        for dir_name in dirs:
            # Get the full path of the source sub-directory
            src_subdir = os.path.join(root, dir_name)
            # Calculate the relative path of the sub-directory
            relative_path = os.path.relpath(src_subdir, src)
            # Construct the full path for the new sub-directory in the destination location
            dest_subdir = os.path.join(dest, relative_path)
            # Create the new sub-directory in the destination location
            os.makedirs(dest_subdir, exist_ok=True)
            print(f'Created: {dest_subdir}')

if __name__ == "__main__":

    source_directory = os.path.join(os.getcwd(),sys.argv[ONE])
    # source_directory = os.path.join(os.getcwd(),'C:\\info')
    destination_directory = os.path.join(os.getcwd(),sys.argv[TWO])
    # destination_directory = os.path.join(os.getcwd(),'C:\\analysis')

    if not os.path.isdir(source_directory):
        print(f"Source directory '{source_directory}' does not exist.")
        sys.exit(1)

    create_subdirs(source_directory, destination_directory)
    print("Sub-directory structure replicated successfully.")
