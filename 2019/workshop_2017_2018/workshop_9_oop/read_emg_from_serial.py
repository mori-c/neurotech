import serial
import time

# Initialize the Serial object by calling: serial.Serial(<port_name>, <baud_rate>)
# Replace 'COM3' below with the port that your Arduino is connected to, which
# is indicated in the bottom right corner of the Arduino IDE window as "Arduino Nano on <port name>"
serialArduino = serial.Serial('COM3', 9600)
print("serialArduino.isOpen() = " + str(serialArduino.isOpen()))

def get_emg_sample():

    # Encode and send a request to the Arduino for a sample
    serialArduino.write(('?').encode('utf-8'))

    # inWaiting() returns the number of bytes available to read from
    # the serial buffer.
    # We wait for 1000 counts then stop if nothing is available.
    # This timeout prevents us from waiting forever if there is some problem
    cnt = 0
    timeout = 1000

    while serialArduino.inWaiting()==0 and cnt <= timeout:
        cnt += 1                                     # Increment the counter

    if cnt >= timeout:
        data = 0                                     # If we reached our timeout, assign data to 0, because there is nothing to read
    else:
        data = int(serialArduino.readline().strip()) # Otherwise, read whatever we saw in the serial buffer

    return data

def main():

    while True:
        sample = get_emg_sample()
        if sample == 1:
            print("Received data: ", sample, "-----------------")
        else:
            print("Received data: ", sample)

        # Wait 33 ms to imitate a 30 fps drawing loop
        time.sleep(0.033)

if __name__ == "__main__":
    main()