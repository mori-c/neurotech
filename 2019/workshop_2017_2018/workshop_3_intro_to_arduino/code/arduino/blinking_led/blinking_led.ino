// This program will blink an LED connected to pin D2 of the Arduino Nano by
// switching between ON and OFF states.

// Declare any variables that are global to the whole program here:

// Connect the long leg of the LED (anode) into pin D2 of the Arduino
// Connect the short leg of the LED (cathode) into the pin GND of the 
// Arduino.
int ledPin = 2;

// Stores the current LED state: HIGH or LOW
int ledState;

void setup() {
  // put your setup code here, to run once:

  // Before we can use a pin on the Arduino, we must set it as an input
  // or output. Here, the LED is an output, so we will set it as such.
  pinMode(ledPin, OUTPUT);

  // Initialize the LED State to LOW
  ledState = LOW;
}

void loop() {
  // put your main code here, to run repeatedly:

  // Invert the LED State: 
  //  If ON:  Set to OFF
  //  If OFF: Set to ON
  //
  // Can you simplify these 4 lines into one line?
  if (ledState == HIGH) {
    ledState = LOW;
  } else {
    ledState = HIGH;
  }

  // Write the value of LED state to the pin to turn the
  // LED on or off
  digitalWrite(ledPin, ledState);

  // Put in a delay of 500 milliseconds before switching
  // the state so we can actually see the LED light up.
  //
  // Try increasing or decreasing this, see what happens!
  delay(500);
}
