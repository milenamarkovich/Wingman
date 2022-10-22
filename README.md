# Wingman
IGEN 430 Project Repository - Wingman Software Dev

## Project Description
This repository contains all software aspects of our IGEN 430 Capstone Project - Wingman. The project includes an automatic setting-machine, allowing volleyball players to train without the need for a setting partner. 
The software components of this project include the mobile app, which allows the user to interact with the device, and the base firmware which will control the device itself and allow us to communicate with the app via WiFi.

## Environment Setup Steps:
1. Clone this repository onto your local Desktop
2. Open the folder via IDE (i.e.: VS Code)
3. Make sure to pull any changes via the Source Control git extension of your IDE
4. In order to run our app we'll be using Expo Go - since the app will be cross-platform it should be able to function on any mobile OS
> In order to demo the app via Expo Go, follow these steps:
>> Install the Expo Go app
>> Log-in or create an account
>> Open a new terminal in your project folder (either in IDE or using Command Prompt/Powershell)
  Follow the steps outlined here: https://reactnative.dev/docs/environment-setup
  run 
     ```
     npx create-app-expo Wingman-App
     ```
  Note: make sure you have Javascript dependencies and npm modules installed prior to running this (otherwise you'll get errors)
     If you're not already in the project folder, change directories: `cd Wingman-App`
     Finally, start your project using
     ```
     npm start
     ```
     You will see a QR code in the terminal output - you can scan this code either using your camera (for iOS phones) or the Expo app
