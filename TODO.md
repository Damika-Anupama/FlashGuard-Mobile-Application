# FlashGuard: Smart Glasses for Real-Time Protection from Photosensitive Epileptic Triggers

## Algorithm

### Parameters

1. Relative luminance percentage change threshold >= 10%
2. Minimum relative luminance threshold < 0.8
3. Red ratio threshold >= 0.8
4. Absolute Pure red difference threshold >= 20
5. Detection Frequency threshold > 3 Hz
6. Area threshold = 25%
7. Lens darkening percentage = 80%

Given values are the defaults

## Mobile App

The FlashGuard mobile app provides the user with information about detected hazards and lets the user adjust the functionality of the glasses.

### Screens

1. Login - Email or Microsoft account
2. Dashboard - Graph of detected hazards
3. Settings - Change parameters, account details, and themes
4. Help - Usage guide and explanation of the parameters
5. Debug - Shows the output of the camera and current values of parameters, and indicates detected hazards.

### Data

The output data will be stored as an array of chunks. A chunk represents 7 transitions (8 frames) and contains information relating to the hazard. Each chunk is a JSON object with the following fields.

```json
{
  "timestamp": "2023-01-02T11:17:08.966Z", // ISO timestamp
  "transitions": [
    {
      "duration": 40, // milliseconds
      "luminance_flash_area": 0.3, // ratio
      "saturated_red_flash_area": 0.1 // ratio
    }
    // ...
  ],
  "hazardous": true,
  "luminance_hazard": true,
  "saturated_red_hazard": false,
  "frequency": 4.5, // Hz
  "parameters": {
    // Parameters of the algorithm
  }
}
```

## ML Model

Take last trigger
Take peak values

## Hardware

The hardware component of the device includes the microprocessor, camera module, battery, lenses, and components to darken the lenses.

### Camera Specifications

- High FOV (captures the user's entire FOV)
- Low resolution
- 30 FPS

### Microprocessor

- Raspberry Pi
- 8 GB SD card

### Lens Darkening Module

<!-- TODO -->

### Glasses

- Photochromic lens
- Frame (3D printed)
-

## Microsoft Azure Backend and Database

<!-- TODO -->

## Questions

1. How to get sufficient feedback from the user?
2. Is 30FPS enough for the camera framerate?
3. How to fit the microprocessor inside the glasses? Should it be attached externally
4. How the ML layer works and how to implement it?
5. Which type of electro-chromic glass should be used?

## Technologies

1. Power BI - Data visualization
2. Azure App Services - Hosting backend
3. VS Code
4. Azure Cosmos DB - Database
5. Azure Machine Learning - ML model
6. Azure Kubernetes Service - Model hosting
7. Azure Functions
8. React Native
9. PyTorch ??
10. Azure Active Directory

## Business Strategy

## Marketing Copy

1. Presentation
2. Tagline
