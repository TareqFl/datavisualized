# React Data Visualizer

Description
This React web application generates random numbers and presents them in a bar-style chart. It features multiple channels functioning as random number generators. Each channel produces a random number between 0 and 10 every second.

Program Requirements
Start and Stop Buttons:

The "Start" button initializes and runs the generators.
The "Stop" button instructs the generators to cease operations.
Bar Charts:

bar charts stacked vertically.
Each new number produced is added as a new bar to the right of the previous one.
Bar height corresponds to the generated number.
Generators operate synchronously, producing one number per second from each channel.
Optional Features
Adjustable Generation Time and Number Range:

Users can adjust the generation time interval and number range at any time.
Save and Load Functionality:

Implemented "Save" and "Load" functionalities.
All generated numbers from each channel are saved and reloaded when required.
New numbers append to the previous ones on a new "Start" command after a load.
File versioning is implemented for save and load operations.
Enhanced Visualization:

Unique colors for each channel.
Numerical indicator for channels.
Horizontal scrolling for better visualization.
Vertical scaling for enhanced chart visualization.
Parameterized Number of Channels:

Users can set the number of channels as a parameter before issuing the initial "Start" command.
Evaluation Criteria
Your submission will be evaluated based on:

Core Functionality:

Timely completion with the core functionality correctly implemented without bugs.
Optional Features Implementation:

Implementation of all of the optional requirements (2, 3, 4, and 5).
Code Documentation:

Clearly documented code adhering to clean code principles.
User Interface:

A user-friendly interface for ease of use.
Coding Style and Structure:

Consistent coding style and a well-structured application.
Scripts Documentation
DisplayChart Component
Purpose:

Displays a bar chart for a specific channel.
State:

values: Array of generated numbers for the channel.
colors: Color for the channel's bars.
channelData: Object containing channel and data.
Effect:

Generates random data for the channel based on the specified conditions.
Updates data when the application is started or stopped.
Chart:

Displays a bar chart using Chart.js and react-chartjs-2.
Zoom Slider:

Allows horizontal scaling for better visualization.
SaveDialog Component
Purpose:

Displays a dialog for saving data.
State:

saving: Current saving status.
Saving Process:

Handles saving process with loading indicators.
Indicates success with a checkmark.
LoadDialog Component
Purpose:

Displays a dialog for loading saved data.
Effect:

Loads saved data and controls the modal.
ChartRenderer Component
Purpose:

Renders charts based on the number of channels.
Effect:

Handles rendering charts based on channels, loaded data, and new data.
AppSettings Context
Purpose:

Manages global state for the application.
Reducer:

Handles state changes based on actions.
Themes:

Manages the theme for the application.
Hooks:

Provides hooks for accessing and modifying state.
Overall Application Structure
Components:

DisplayChart, SaveDialog, LoadDialog, ChartRenderer.
Context:

AppSettings for managing global state.
Theming:

Uses MUI theming for a consistent look.
Optional Features:

Save and load functionality, adjustable parameters, enhanced visualization.
Clean Code:
