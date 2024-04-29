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
import pandas as pd
from dlc2kinematics import Visualizer2D, Visualizer3D
import matplotlib.pyplot as plt
from matplotlib.pyplot import cm
import os
import numpy as np
import pandas as pd
import sys
import cv2
import mpld3
import plotly.graph_objs as go
from plotly.tools import mpl_to_plotly
import time_in_each_roi #the function needs to be in the same folder as the notebook
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
import keras
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
# video_path = "D:\\testing_videos_new\\vid2.mp4"
# config = 'C:\Experiment16-Tester16-2024-02-21\config.yaml'
# h5 = 'C:\Experiment18-Tester18-2024-02-29\\videos\\vid1DLC_resnet50_Experiment18Feb29shuffle1_20000.h5'
h5 = os.path.join(os.getcwd(),sys.argv[ONE])
bpt = sys.argv[TWO]
df, bodyparts, scorer = dlc2kinematics.load_data(h5)
# # Save df to CSV
# df.to_csv('df_data.csv', index=False)

# df_vel = dlc2kinematics.compute_velocity(df,bodyparts=['all'], filter_window=THREE, order=ONE)
# # print("df val is:\n", df_vel)
# df_speed = dlc2kinematics.compute_speed(df,bodyparts=[bpt], filter_window=THREE, order=ONE)
# print("df speed is:\n", df_speed)
# print("df speed is:\n", df_speed)



df_vel_bodypart = dlc2kinematics.compute_velocity(df,bodyparts=[bpt], filter_window=THREE, order=ONE)
df_vel_bodypart



# Compute the average of 'x' values
average_x = df[scorer][bpt]['x'].median()
# Compute the average of 'x' values
average_y = df[scorer][bpt]['y'].median()

# Print the average
print("Average of 'x' values:", average_x)
# Print the average
print("Average of 'y' values:", average_y)

for index, value in df_vel_bodypart[(scorer, bpt, 'x')].items():
# Apply the condition to set the values in df[scorer][bpt] to zero based on velocity criteria
    if (df_vel_bodypart.loc[index, (scorer, bpt, 'x')] > 30) or (df_vel_bodypart.loc[index, (scorer, bpt, 'x')] < -30):
        df_vel_bodypart.loc[index, (scorer, bpt, 'x')] = 0
        df_vel_bodypart.loc[index, (scorer, bpt, 'y')] = 0
    if (df_vel_bodypart.loc[index, (scorer, bpt, 'y')] > 50) or (df_vel_bodypart.loc[index, (scorer, bpt, 'y')] < -50):
        df_vel_bodypart.loc[index, (scorer, bpt, 'x')] = 0
        df_vel_bodypart.loc[index, (scorer, bpt, 'y')] = 0
        # df.loc[index, (scorer, bpt, 'x')] = 200
for index, value in df[scorer][bpt]['x'].items():
# Apply the condition to set the values in df[scorer][bpt] to zero based on velocity criteria
    if ((df.loc[index, (scorer, bpt, 'x')] > 330)):
        # df_vel_bodypart.loc[index, (scorer, bpt, 'x')] = 0
        # df_vel_bodypart.loc[index, (scorer, bpt, 'y')] = 0
        if (index > 2):
            df.loc[index, (scorer, bpt, 'x')] = df.loc[index - 2, (scorer, bpt, 'x')]
            df.loc[index, (scorer, bpt, 'y')] = df.loc[index - 2, (scorer, bpt, 'y')]

print(df[scorer][bpt])

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
# print("df val is:\n", df_vel_bodypart)
# dlc2kinematics.plot_velocity(df[scorer][bpt], df_vel_bodypart, start=1700, end=1900)
# dlc2kinematics.plot_velocity(df[scorer][bpt], df_vel_bodypart)

# ax = df_vel_bodypart[ZERO:len(df_vel_bodypart)].plot(kind="line")  
# # Extract data from the Matplotlib plot (assuming ax is a Matplotlib AxesSubplot)
# lines = ax.get_lines()  # Get all lines from the plot

# # Initialize empty lists for time and velocity data
# time_data = []
# velocity_data = []

# # Extract data from each line and append to the respective lists
# for line in lines:
#     x_data = line.get_xdata()  # Get x-axis data
#     y_data = line.get_ydata()  # Get y-axis data

#     # Append data to the lists
#     time_data.extend(x_data)
#     velocity_data.extend(y_data)

# # Define margin as a string in Python
# margin = '{ top: 20, right: 30, bottom: 30, left: 50 }'
# height = '400'

# # Generate D3.js code with the extracted data
# d3_code = f"""
# // D3.js code for a line chart
# const margin = {margin};
# const width = 600 - margin.left - margin.right;
# const height = {height} - margin.top - margin.bottom;

# // Python data converted to JavaScript arrays
# const timeData = {time_data};
# const velocityData = {velocity_data};

# const data = timeData.map((d, i) => ({{
#     time: d,
#     velocity: velocityData[i]
# }}));

# const svg = d3.select("body").append("svg")
#     .attr("width", width + margin.left + margin.right)
#     .attr("height", height + margin.top + margin.bottom)
#     .append("g")
#     .attr("transform", `translate(${margin.left}, ${margin.top})`);

# const x = d3.scaleLinear()
#     .domain([0, d3.max(data.time)])
#     .range([0, width]);

# const y = d3.scaleLinear()
#     .domain([0, d3.max(data.velocity)])
#     .range([height, 0]);

# const line = d3.line()
#     .x((d) => x(d.time))
#     .y((d) => y(d.velocity));

# svg.append("path")
#     .datum(data)
#     .attr("fill", "none")
#     .attr("stroke", "steelblue")
#     .attr("stroke-width", 2)
#     .attr("d", line);

# svg.append("g")
#     .attr("transform", `translate(0, ${height})`)
#     .call(d3.axisBottom(x));

# svg.append("g")
#     .call(d3.axisLeft(y));

# svg.append("text")
#     .attr("x", width / 2)
#     .attr("y", height + margin.top + 20)
#     .style("text-anchor", "middle")
#     .text("Time");

# svg.append("text")
#     .attr("transform", "rotate(-90)")
#     .attr("x", -height / 2)
#     .attr("y", -margin.left + 10)
#     .style("text-anchor", "middle")
#     .text("Velocity");

# console.log("D3.js code generated successfully.");
# """

# # Save the D3.js code to a JavaScript file
# with open("line_chart.js", "w") as js_file:
#     js_file.write(d3_code)

# print("D3.js code saved to line_chart.js")
########################
#Subplot 1
########################
#Set the size of the matplotlib canvas
fig = plt.figure(figsize = (18,8))
# plt.subplot(1,3,1)

def velocity():
    ax = df_vel_bodypart[ZERO:len(df_vel_bodypart)].plot(kind="line")    
    plt.xlabel("Frame numbers")
    plt.ylabel("velocity (AU)")
    ax.spines["right"].set_visible(False)
    ax.spines["top"].set_visible(False)
    plt.title("Computed Velocity", loc="left")
    plt.legend(loc='lower left', labels=['x', 'y', 'likelihood'])

velocity()
plt.savefig("../frontend/src/output1.jpg")
plt.close('all')
velocity()
plt.savefig("../frontend/public/output1.jpg")
########################
#Subplot 2
########################
# plt.subplot(1,3,2)

def position():
    ax1 = df[scorer][bpt][ZERO:len(df_vel_bodypart)].plot(kind="line")
    plt.xlabel("Frame numbers")
    plt.ylabel("position")
    ax1.spines["right"].set_visible(False)
    ax1.spines["top"].set_visible(False)
    plt.title("Loaded Position Data", loc="left")
    plt.legend(loc='lower left')
position()
plt.savefig("../frontend/src/output2.jpg")
plt.close('all')
position()
plt.savefig("../frontend/public/output2.jpg")
plt.close('all')
#let's calculate velocity of the snout






# vel = time_in_each_roi.calc_distance_between_points_in_a_vector_2d(np.vstack([df[scorer][bpt]['x'].values.flatten(), df[scorer][bpt]['y'].values.flatten()]).T)

# fps=120 # frame rate of camera in those experiments
# time=np.arange(len(vel))*1./fps
# vel=vel #notice the units of vel are relative pixel distance [per time step]

# # store in other variables:
# xleg=df[scorer][bpt]['x'].values
# yleg=df[scorer][bpt]['y'].values
# vleg=vel
# plt.plot(time,vel*1./fps)
# plt.title('Speed in pixels over time')
# plt.xlabel('Time in seconds')
# plt.ylabel('Speed in pixels per second')
# plt.show()




# print("first val is:\n", df[scorer][bpt]['x'])
# print("second val is:\n", df_vel_bodypart)

# 1840:1870, 

# plt.plot(df[scorer][bpt]['x'][1880:1920], -df[scorer][bpt]['y'][1880:1920], 'r-')
# # plt.axis((1840, 1880, 1840, 1880))
# plt.show()

########################
#Subplot 3
########################
# plt.subplot(1,3,3)
def walking_pattern():
    velocity_values = df_vel_bodypart[(scorer, bpt, 'x')]
    prev_value = velocity_values[ZERO]
    # prev_index = ZERO
    frame_start = ZERO
    frame_end = ZERO
    flag = ZERO
    color_forwards = iter(cm.Purples(np.linspace(0,1,len(velocity_values))))
    color_backwards = iter(cm.Greys(np.linspace(0,1,len(velocity_values))))

    # Go over the velocities, check if reaches zero:
    for index, value in velocity_values.items():
        c_f = next(color_forwards)
        c_b = next(color_backwards)
        # Check if the value is higher than zero and is the first nan-negative value (starting movement)
        if (value > prev_value and value >= ZERO and prev_value < ZERO):
            frame_start = index


            # If movement ended, plot the end of the prev. movement as the start of the new
            # When flag is one or (frame_start - frame_end) is smaller than 5 it is a noise (false movement) 
            if (frame_end != ZERO and (frame_start - frame_end) > 5 and flag == ZERO):
                # Plot the end of the movement
                plt.plot(df[scorer][bpt]['x'][frame_end:frame_start - 3], -df[scorer][bpt]['y'][frame_end:frame_start - 3], color = c_b)
        # Define as false movement 
        if ((index - frame_start) <= 5):
            flag = ONE


        # Check if the value is smaller than zero and is the first nan-positive value (ending movement)
        elif (value < prev_value and value <= ZERO and prev_value > ZERO):
            flag = ZERO
            frame_end = index


        if (frame_start < frame_end):
        
    #    plt.plot(x, y, c=c)
            # Plot the start of the movement
            # c=next(color) #Change colour for each line in plot
            plt.plot(df[scorer][bpt]['x'][frame_start:frame_end], -df[scorer][bpt]['y'][frame_start:frame_end], color=c_f)
        prev_value = value
        # prev_index = index
    plt.title("Walking pattern of the mouse")
    plt.xlabel("x location [AU]")
    plt.ylabel("y location [AU]")
# plt.savefig("../frontend/public/output3.jpg")
walking_pattern()
plt.savefig("../frontend/src/output3.jpg")
plt.close('all')
walking_pattern()
plt.savefig("../frontend/public/output3.jpg")
plt.close('all')
# plotly_fig = mpl_to_plotly(fig)  # Convert Matplotlib figure to Plotly

# # Save the Plotly graph as JSON or image
# plotly_fig_json = plotly_fig.to_json()