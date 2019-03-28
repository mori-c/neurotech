
bool debug = true;

int ana_pin = A5;
int switch_pin = 9;
int led_pin = 8;

const double VPP = 5.0;
const int bit_depth = 10;
int ADC_RESOLUTION;

double closed_max = 0, closed_min = 5;
bool start = false;
double start_cal_time;

void setup() {
  double cal_sample_binary, cal_sample_volt;
  int calibration_timeout = 5;
  
  // Make sure what ever you put here matches your Serial Monitor setting
  Serial.begin(115200);
  Serial.flush();
  
  pinMode(ana_pin, INPUT);
  pinMode(led_pin, OUTPUT);
  pinMode(switch_pin, INPUT);
 
  ADC_RESOLUTION = pow(2, bit_depth)-1;
  
  Serial.println("Press the button to initial calibration.");
  while (!start) {
    if (digitalRead(switch_pin)) start = true;
  }

  Serial.println("Starting calibration...");

  blinkLedNTimes(5, 100);
  
  // Calibrate covered level
  start_cal_time = millis();
  while (digitalRead(switch_pin) == LOW) {
    cal_sample_binary = analogRead(ana_pin);
    cal_sample_volt = binaryToVolt(cal_sample_binary);

    if (debug) plotMinMax(closed_min, closed_max, cal_sample_volt);

    if (cal_sample_volt >= closed_max)
      closed_max = cal_sample_volt;
    else if (cal_sample_volt <= closed_min)
      closed_min = cal_sample_volt;
      
    // Reset max and min every 2 seconds to restart calibration
    if ((millis() - start_cal_time) >= calibration_timeout*1000) {
        if (!debug) Serial.println("Timed out, restarting calibration");
        blinkLedNTimes(2, 100);

        closed_max = 0;
        closed_min = 5;
        start_cal_time = millis();
    }
  }
  Serial.flush();

  blinkLedNTimes(10, 100);

  Serial.println("Finished calibration...");
} // end setup()

void loop() {
    double sample_bin, sample_v;
    sample_bin = analogRead(ana_pin); 
    sample_v = binaryToVolt(sample_bin);
    
    if (debug) plotMinMax(closed_min, closed_max, sample_v);
    
    if (sample_v <= closed_max) {
      if (!debug) Serial.println("ON");
      digitalWrite(led_pin, HIGH);
    } else {
      if (!debug) Serial.println("OFF");
      digitalWrite(led_pin, LOW);
    }
} // end loop()

/////////// Functions ///////////////////

double binaryToVolt(int sample) {
  return (sample * VPP / ADC_RESOLUTION);
}

void blinkLedNTimes(int n_blinks, int period) {
  for (int i = 0; i < n_blinks; i++) {
    digitalWrite(led_pin, HIGH);
    delay(period);
    digitalWrite(led_pin, LOW);
    delay(period);
  }
}

void plotMinMax(double minimum, double maximum, double sample) {
    Serial.print(maximum);
    Serial.print(" ");
    Serial.print(sample); 
    Serial.print(" ");
    Serial.println(minimum);
}



