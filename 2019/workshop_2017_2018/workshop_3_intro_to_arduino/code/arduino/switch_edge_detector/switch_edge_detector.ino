// This program will introduce a concept known as edge-detection. This program
// will blink an LED every time the switch is flipped. 

// Connect the switch to your breadboard as shown in the diagram. Note
// that the left most pin of the switch is connected to pin D9 of the
// Arduino
int switchPin = 9;

// Connect the long leg of the LED (anode) into pin D2 of the Arduino
// Connect the short leg of the LED (cathode) into the pin GND of the 
// Arduino.
int ledPin = 2;

// Declare two variables, one to store the current state of the switch (currentState)
// and the other (prevState) to store the last state of the switch
// 
// Why can't we declare these variables in loop() as we did in the previous example?
int currentState, prevState;

void setup() {
  // Set the pin to which the switch is connected to
  // be an input into the Arduino
  pinMode(switchPin, INPUT);

  // Set the pin to which the LED is connected to
  // be an output of the Arduino
  pinMode(ledPin, OUTPUT);

  // Initialize the previous state of the switch by 
  // reading its state into prevState at the start
  // of the program.
  prevState = digitalRead(switchPin);
}

void loop() {
   
  // Record the current state of the switch
  currentState = digitalRead(switchPin);
   
  if (currentState != prevState) {
    // If the current state of the switch differs from the last
    // time we read its state, turn the LED on for 100 ms.
    digitalWrite(ledPin, HIGH);
    delay(100);
  } else {
    // Otherwise, turn the LED off.
    digitalWrite(ledPin, LOW);
  }

  // Record the current state of the switch into prevState for reference
  // by subsequent loop() calls.
  prevState = currentState;
}
