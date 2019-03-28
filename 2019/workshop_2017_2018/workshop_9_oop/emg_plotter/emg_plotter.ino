///////////////////////////////////////////////////////////////////////////////////////
// This program reads one sample from pin A5 (which will connect to the circuit output
// and sends it to a computer with Serial.println()).
// If you don't have the EMG circuit, any analog sensor can serve as a replacement.
///////////////////////////////////////////////////////////////////////////////////////


/////////// Constants /////////////////////
const int PRINT_PERCISION = 8;
const int BITS_PER_SAMPLE = 10;

// Peak to peak voltage of incoming signal
const double VPP = 5;
double threshold = VPP / 2;
int ana_port = A5;

///////// Low pass filter parameters ///////

// Set this to true to enable the low-pass filter. False will plot the signal un-filtered
boolean low_pass = false;

// The number of samples to average. Generally a larger number of samples results in more smoothing.
// Increase or decrease to tune the filtering.
const int N_TAPS = 50;

// Moving window to store samples to be averaged.
double moving_average[N_TAPS];
int avg_index;

//////////////////////////////////////////////

const double MICROSEC_TO_SEC = 1000000;
int resolution;

void setup() {

  // Make sure what ever you put here matches your Serial Monitor setting
  Serial.begin(9600);
  Serial.flush();
  pinMode(ana_port, INPUT);

  resolution = pow(2, BITS_PER_SAMPLE);

} // end setup()

void loop() {
  double sample;


  // Sample the analog input into pin A5 and store it in the variable sample
  sample = analogRead(ana_port);

  // Scale the reading from a range of 0-1023 to 0-5.
  // If using the Serial plotter, doing this scaling before plotting results in
  // a plot that is less erratic and easier to follow.
  sample *= VPP / resolution;

  // Filter noise if low_pass == true
  if (low_pass) low_pass_signal(sample);

  // Send the sample to your PC over Serial.
  Serial.println(sample);

  // Delay 5 milliseconds
  delay(5);

} // end loop()


// Implement a low pass filter with an averaging filter.
// The number of samples averaged is N_TAPS, and can be set
// at the top of the program
void low_pass_signal(double &sample) {
  double new_sample = sample;
  double sum = 0;

  // Fill up the window
  if (avg_index < N_TAPS) {
    moving_average[avg_index] = sample;
    avg_index++;
  }
  else {
    for (int m = N_TAPS - 1; m >= 0; m--) {
      if (m == 0)
        moving_average[m] = new_sample;
      else
        moving_average[m] = moving_average[m - 1];

      sum += moving_average[m];
    }
  }
  sample = sum / N_TAPS;
}








