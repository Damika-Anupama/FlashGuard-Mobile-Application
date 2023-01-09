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
