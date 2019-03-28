
int ana_port = A5;
int switch_port = 9;
int LED_PIN = 8;

const double VPP = 5.0;
const int bit_depth = 10;
int ADC_RESOLUTION;

int calibration_timeout = 5;
double closed_max = 0, closed_min = 5, opened_max = 0, opened_min = 5;
bool start = false;
double start_cal_time, end_cal_time;

void setup() {
  double closed_sample_cnt, opened_sample_cnt, cal_sample_binary, cal_sample_volt;
  
  // Make sure what ever you put here matches your Serial Monitor setting
  Serial.begin(115200);
  Serial.flush();
  pinMode(ana_port, INPUT);
  pinMode(LED_PIN, OUTPUT);
  pinMode(switch_port, INPUT);
 
  ADC_RESOLUTION = pow(2, bit_depth)-1;
  while (!start) {
    if (digitalRead(switch_port)) {
      start = true;
    }
  }

  blinkLedNTimes(3, 200);
  
  // Calibrate opened level
  start_cal_time = millis();
  while (digitalRead(switch_port) == LOW) {
    cal_sample_binary = analogRead(ana_port);
    cal_sample_volt = binaryToVolt(cal_sample_binary);

    plotMinMax(opened_min, opened_max, cal_sample_volt);

    if (cal_sample_volt >= opened_max)
      opened_max = cal_sample_volt;
    else if (cal_sample_volt <= opened_min)
      opened_min = cal_sample_volt;
      
    // Reset max and min every 10 seconds to restart calibration
    if ((millis() - start_cal_time) >= calibration_timeout*1000) {
        blinkLedNTimes(2, 200);

        opened_max = 0;
        opened_min = 5;
        start_cal_time = millis();
    }
  }
  Serial.flush();

  // Let ADC settle
  blinkLedNTimes(5, 100);

  // Calibrate covered level
  start_cal_time = millis();
  while (digitalRead(switch_port) == LOW) {
    cal_sample_binary = analogRead(ana_port);
    cal_sample_volt = binaryToVolt(cal_sample_binary);

    plotMinMax(closed_min, closed_max, cal_sample_volt);

    if (cal_sample_volt >= closed_max)
      closed_max = cal_sample_volt;
    else if (cal_sample_volt <= closed_min)
      closed_min = cal_sample_volt;
      
    // Reset max and min every 10 seconds to restart calibration
    if ((millis() - start_cal_time) >= calibration_timeout*1000) {
        blinkLedNTimes(2, 100);

        closed_max = 0;
        closed_min = 5;
        start_cal_time = millis();
    }
  }
  Serial.flush();

  blinkLedNTimes(10, 100);
} // end setup()

void loop() {
    double sample_bin, sample_v;
    sample_bin = analogRead(ana_port); 
    sample_v = binaryToVolt(sample_bin);
    plotMinMax(closed_min, closed_max, sample_v);
    if (sample_v <= closed_max) {//((sample_v <= closed_max) && (sample_v >= closed_min)) {
      digitalWrite(LED_PIN, HIGH);
    } else {
      digitalWrite(LED_PIN, LOW);
    }
} // end loop()

/////////// Functions ///////////////////

double binaryToVolt(int sample) {
  return (sample * VPP / ADC_RESOLUTION);
}

void blinkLedNTimes(int n_blinks, int period) {
  for (int i = 0; i < n_blinks; i++) {
    digitalWrite(LED_PIN, HIGH);
    delay(period);
    digitalWrite(LED_PIN, LOW);
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



