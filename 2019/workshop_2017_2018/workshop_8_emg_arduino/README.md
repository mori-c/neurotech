## Workshop #8: EMG + Arduino

This workshop covers the Arduino program that will be used to process the raw EMG signal, extract muscle contractions, and communicate said contractions to a Python program running on a PC that reads Serial input.

This directory contains the three Arduino programs that were gone through during the workshop itself:
  - **emg_detector_threshold_only**
  - **emg_detector_threshold_and_handshake**
  - **emg_detector_v1**: The completed Arduino program which implements the whole bicep curl detection algorithm and serial communication. For testing and developement, **emg_detector_v1** will suffice.

Since we will eventually need some means of calibrating the game to different users, **emg_detector_v2** covers this functionality. Although this program was not covered in the workshop, it uses a variation of the calibration method taught in Workshop #3: Introduction to Arduino, and should be understandable for those that attended both workshops. 

Within the context of our workshops, the **emg_detector** will be used with an open-source Python implementation of the game Flappy Bird. The folder **flappybird** contatins a single file: **input.py** which is the input file for the game with the necessary modifications to communicate with the Arduino over Serial.
