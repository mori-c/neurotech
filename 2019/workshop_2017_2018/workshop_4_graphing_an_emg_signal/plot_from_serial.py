import serial
import matplotlib.pyplot as plt
from drawnow import *
import atexit
import sys

# Declare a list to hold all the samples that will be plotted on the graph
# at the present moment in time. We will update this list as we recieve samples,
# adding new samples to the list and removing old samples. This is a simple
# instance of a 'moving window'.
samples = []

# Enable interactivity
plt.ion()

# Replace /dev/ttyACM0 with the serial port that your Arduino is connected to.
# You should be able to view this at the bottom right corner of the Arduino IDE 
# window as "Arduino Uno on <port name>"
serialArduino = serial.Serial('/dev/ttyACM0', 9600)


def plotValues():
    plt.title('Serial value from Arduino')
    plt.grid(True)
    plt.ylabel('Values')
    plt.plot(samples, 'rx-', label='values')
    plt.legend(loc='upper right')

def doAtExit():
    serialArduino.close()
    print("Close serial")
    print("serialArduino.isOpen() = " + str(serialArduino.isOpen()))

atexit.register(doAtExit)

print("serialArduino.isOpen() = " + str(serialArduino.isOpen()))

# Pre-load dummy data to populate the list. The presence of dummy data when we 
# start plotting is needed so we have a fixed window size.
for i in range(0,26):
    samples.append(0) # Initialize to 0
    #clr // This function does not work with Python 3

while True:

    # inWaiting() returns the number of bytes available to read from
    # the serial port. If there is nothing for us to read, we keep
    # waiting
    while (serialArduino.inWaiting()==0):
        pass

    # Read all the bytes in the serial buffer until we see a line break (\n or \b)
    # In the Arduino program, the value must be sent with Serial.println() to automatically
    # append a line break at the end of your value.
    valueRead = serialArduino.readline()

    # Alternatively, you can read N number of bytes from the buffer using
    # serialArduino.read(N). 

    # When reading from a serial port, there is no concept of integers or characters, just
    # bytes (group of 8 bits) and 1's and 0's. This is why we must be prepared for errors that
    # are thrown when attempting to cast a non-integer to an integer.
    #
    # This is achieved through a try ... except clause.
    try:

        # Cast the value read to an integer. If an error of ValueError type occurs, the program
        # will jump to the except ValueError clause
        valueInInt = int(valueRead) 
        print(valueInInt)

        # Assuming we are receiving raw, unaltered analog readings from the Arduino, the highest
        # possible reading is 1023
        if valueInInt < 1024:

            # The lowest possible reading is 0
            if valueInInt >= 0:

                # Uncomment this if you want to convert the value read into a voltage 
                # and replace valueInInt in the append call below to valueInDouble
                # valueInDouble = valueInInt * (5.0/1024)
                
                # Add value to the front of the values list. 
                samples.append(valueInInt)

                # Remove the oldest (last) value from the list
                samples.pop(0)

                print(valueInInt)

                # drawnow allows you to update your plot. It will call plotValues() function 
                # to update the plot
                # Note that here, you are passing a function to another function as an argument
                drawnow(plotValues)
            else:
                print("Invalid! negative number")
        else:
            print("Invalid! too large")

    except ValueError:
        print("Invalid! cannot cast")
