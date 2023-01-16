# FlashGuard: Real-Time Protection from Photosensitive Epileptic Seizures

Epilepsy is the most common chronic brain disease, affecting more than 50 million people worldwide. Of those affected, 5% have a particular form of epilepsy called photosensitive epilepsy, in which seizures are triggered by visual stimuli such as flashing lights or rapidly changing images. While photosensitive epilepsy has been extensively studied in neurology, little has been done to prevent hazardous triggers in real-time.

We present FlashGuard, a method to prevent photosensitive epileptic seizures through a pair of glasses that will detect a visual stimulus which can trigger a seizure in real-time and darken the lenses to protect the user from hazardous exposure to visual stimuli.

## How it Works

The core functionality of this product is detecting possible seizure triggers in real-time and darkening the glass lens in response. Input is taken in from a camera fixed to the glasses. The microprocessor embedded in the frame will then process the input data using an algorithm to measure the frequency of changes in color and brightness. If the computed frequencies are within the range of frequencies that trigger seizures, the electro-chromic glass lens will be darkened until the trigger has subsided.

The frequency range that triggers epilepsy seizures varies from person to person. A mobile app interface is used to fine-tune the detection for the user, using personal information and feedback given by the user. Whenever the device detects a potential trigger, relevant information about the detection such as the time, duration, flashing frequency, and intensity will be sent to the mobile app from the device which will then store that information in the Azure Cloud. A notification will be sent to the user informing them about the detected trigger and allowing them to give feedback about the effectiveness of the device during the incident. The user will also be able to provide feedback in a situation where the device fails to detect a seizure trigger. By combining the received feedback and the information recorded in the cloud, an analysis using machine learning techniques can be done to optimally adjust the device parameters to suit the user’s condition.

## Device Functionality

FlashGuard is designed to detect potential seizure triggers in real-time and darken the glass lens in response. The device is equipped with a camera and a microprocessor embedded in the frame that processes the input data using an algorithm to measure the frequency of changes in color and brightness. If the computed frequencies are within the range of frequencies that trigger seizures, the electro-chromic glass lens will be darkened until the trigger has subsided.

## Incorporating Azure Web Services

Azure web services such as Azure IoT Hub, Azure Functions, Azure SQL Managed Instance, Azure Blob Storage, Azure Machine Learning, Azure Stream Analytics, Notification Hubs, and Azure Web Apps are utilized for this application.

## Core Technologies

We have planned to use a Raspberry Pi to realize the functionality within the glasses, and mainly make use of Azure web services such as Azure Web Apps, Azure IoT Hub, and Azure Machine Learning to implement the software components.

## Mobile App

The FlashGuard mobile app is designed to work in conjunction with the FlashGuard glasses to provide real-time protection from photosensitive epileptic seizure triggers. The app allows users to fine-tune the detection settings for their specific needs and provides a user-friendly interface for managing and analyzing the data collected by the glasses.

### Features

The FlashGuard device comes equipped with various features to ensure a personalized, safe, and convenient experience for the user. These features include:

1. Personalized Detection Settings: The app allows users to input personal information and adjust the detection settings for the glasses, such as the frequency range that triggers seizures and how much the glasses darken when a hazard is detected.

2. Feedback System: Users can provide feedback on the effectiveness of the glasses during seizures and also in situations where the device fails to detect a seizure trigger. Information such as the time, duration and impact of a failed detection are collected from the user. Also, users can view a history of their seizures and feedback provided in the mobile app.

3. Device Pairing: Users can initiate the pairing process and confirm the connection with their glasses. Information on the device status such as battery level and connection strength can be monitored through the mobile app.

4. Data Analysis: The app stores the data collected by the glasses in the Azure Cloud and uses machine learning techniques to analyze the data and optimize the device's parameters for the user's condition.

5. User-Friendly Interface: The app has a simple and intuitive interface that makes it easy for users to manage and analyze their data.

6. Help and Support: users can access help and support resources such as instructions and contact information for customer support

7. Security: Secure user registration and login using industry-standard encryption. The data is stored in Azure Cloud with secure access controls and encryption with regular security updates and vulnerability management.

8. Accessibility: The app will be designed to meet accessibility guidelines for users with disabilities.

9. Platform: The app will be developed for both iOS and Android platforms.

## Technical Aspects of the Device

The FlashGuard device uses a camera, microprocessor, and electro-chromic glass lens to detect possible seizure triggers in real-time and swiftly darken the glasses to prevent harm to the user. The camera will be fixed to the glasses and will capture visual stimuli in real-time. The microprocessor, embedded in the frame, will process the input data using an algorithm to measure the frequency of changes in color and brightness. The algorithm will be based on the research done in the field of photosensitive epilepsy and will be fine-tuned using machine learning techniques. The electro-chromic glass lens will be used to darken the glasses in response to the detected visual stimuli, providing protection to the user.
