// Moving average filter
boolean low_pass = false;

// LED threshold
// Flash an LED, if the reading is above this threshold
double threshold = 0.01;

int ana_port = A5;

// Peak to peak voltage of incoming signal
const double VPP = 5.0;
const int bit_depth = 10;

int LED_PIN = 8;
int ADC_RESOLUTION;

// Low pass filter
const int N_TAPS = 30;
double moving_average[N_TAPS];
int avg_index;

void setup() {
  
  // Make sure what ever you put here matches your Serial Monitor setting
  Serial.begin(115200);
  Serial.flush();
  pinMode(ana_port, INPUT);
  pinMode(LED_PIN, OUTPUT);

  
  ADC_RESOLUTION = pow(2, bit_depth)-1;
  avg_index = 0;

} // end setup()

void loop() {
    double sample = analogRead(ana_port); 
    sample *= VPP / ADC_RESOLUTION;

    if (low_pass) {
      low_pass_signal(sample);
    }

    Serial.println(sample); 
    if (sample < threshold) {
      digitalWrite(LED_PIN, HIGH);
    } else {
      digitalWrite(LED_PIN, LOW);
    }
} // end loop()

/////////// Functions ///////////////////
void low_pass_signal(double &sample) {
  double new_sample = sample;
  double sum = 0;
  if (avg_index < N_TAPS) {
    moving_average[avg_index] = sample;
    avg_index++;
  } else {
    for (int m = N_TAPS - 1; m >= 0; m--) {
      if (m == 0)
        moving_average[m] = new_sample;
      else
        moving_average[m] = moving_average[m-1];
      
      sum += moving_average[m];
    }
  }
  sample = sum / N_TAPS;
}



