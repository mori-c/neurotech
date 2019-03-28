 // This program will function as a simple light switch, whereby switching
// the flip on, the LED will light up, and flipping the switch off will turn
// the LED off.

// Connect the switch to your breadboard as shown in the diagram. Note
// that the left most pin of the switch is connected to pin D9 of the
// Arduino
int switchPin = 9;

// Connect the long leg of the LED (anode) into pin D2 of the Arduino
// Connect the short leg of the LED (cathode) into the pin GND of the 
// Arduino.
int ledPin = 2;

void setup() {
  // put your setup code here, to run once:

  // Set the pin to which the switch is connected to
  // be an input into the Arduino
  pinMode(switchPin, INPUT);

  // Set the pin to which the LED is connected to
  // be an output of the Arduino
  pinMode(ledPin, OUTPUT);
}

void loop() {

  // Variable to store the reading of the switch
  int switchState;
  
  // Read the state of the switch. If the switch is
  // closed, digitalRead() will return 1, otherwise
  // digitalRead() will return 0.
  switchState = digitalRead(switchPin);

  if (switchState == 1)          // If the switch is closed
    digitalWrite(ledPin, HIGH);
  else {                         // If the switch is open			
    digitalWrite(ledPin, LOW);
  }
}
