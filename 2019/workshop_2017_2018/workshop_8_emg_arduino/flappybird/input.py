"""
This is where you will accept input.

Get data EMG data, and return True if active, or
False if not.

There is a default implementation for keyboard control, but
you should replace that using serial data from the EMG.

_trigger_input is called once every frame. Returning True
will cause Flappy Bird to jump.
"""

import pygame
import serial
import time

# Replace /dev/ttyACM0 with the serial port that your Arduino is connected to.
# You should be able to view this at the bottom right corner of the Arduino IDE 
# window as "Arduino Uno on <port name>"
serialArduino = serial.Serial('/dev/ttyACM0', 9600)

# Put a small delay here to prevent the game from sending requests to the Arduino is 
# resetting in response to the serial.Serial() call above. Otherwise, the program may
# hang.
time.sleep(2)

def _trigger_input() -> bool:

	# Send a request to the Arduino for a sample
	serialArduino.write((‘?’).encode(‘utf-8’))	
	
	# inWaiting() returns the number of bytes available to read from
	# the serial port. If there is nothing for us to read, we keep
	# waiting

	cnt = 0
	timeout = 10000
	while (serialArduino.inWaiting()==0 and cnt < timeout):
		pass

	if (cnt >= timeout):
		data = 0
	else:	
		data = int(serialArduino.readline().strip());

	if (data == 1):
		print("Received data: ", data, "-----------------")
		return True
	else:
		print("Received data: ", data)
		return False
