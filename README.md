# NeuroTech Course

Intro to Neurotech: [2018-2019](https://github.com/neurotechuoft/Workshops)

---

To-Do:
-[ ]  [Wk2 - Signal Processing Exercises](https://github.com/neurotechuoft/Workshops/tree/master/workshop_2018_2019/notebooks) / [Answers](https://github.com/neurotechuoft/Workshops/blob/master/workshop_2018_2019/notebooks/answers/wk2b_intro_to_signal_processing.ipynb)
-[ ] Read about [FIR vs IIR](https://community.plm.automation.siemens.com/t5/Testing-Knowledge-Base/Introduction-to-Filters-FIR-versus-IIR/ta-p/520959)

---

[General Outline](https://www.facebook.com/events/580805392331663)

Week 1, 21/1/19: 
Introduction to Python
Absolute basics of programming

Week 2, 28/1/19: 
I. Introduction to Git — 
II. Loading and graphing data
Git + GitHub, how to load data from CSVs (or FIFs), graphing data with Matplotlib

Week 3, 04/2/19: 
Introduction to Neuroscience
History, how neurons work (brief intro), neuroanatomy review, Rall's Cable Theory, membrane potential (Nernst, GHK, HH equations)

[Week 4, 11/2/19](https://mailchi.mp/f0e9cca4a344/week-4-readings): 
Noise Filtering
Filtering noise, and an introduction to the Fast Fourier Transform

18/2/19 
Reading Week — No workshop

Week 5, 25/2/19: 
Digital Signal Processing
Convolution, impulse responses, signal types, continuous vs discrete, aliasing, Nyquist's Theorem, [FIR vs IIR](https://community.plm.automation.siemens.com/t5/Testing-Knowledge-Base/Introduction-to-Filters-FIR-versus-IIR/ta-p/520959), different types of filters, filter order

Week 6, 04/3/19: 
Uncovering Oscillatory Processes in EEG
What exactly is EEG, physics of EEG, oscillatory processes vs ERPs, power spectral analysis for EEG power bands

Week 7, 11/3/19: 
Brain Art Project! + Advanced Git + offline (dataset) work session
Intro to brain art project; how to get started; group Git; start working

Week 8, 18/3/19: 
Intro to MuseJs + Brain Art architecture, brain artwork session (online)
A bit about how Brain Art was made, MuseJs, work session

Week 9, 25/3/19: 
Present Brain Art!


---

# Introduction to Neurotechnology ⋯ 2019

University of Toronto

# Topics

---

1. Python
2. Graphing Data
3. Fast Fourier Transform ⋯ FFT 
4. Neuroscience Intro
5. Digital Signal Processing
6. EEG Oscillatory Processes
7. Angular
8. Generative Signal Processing Art
9. Neuromodulation
10. MusicJ Framework
11. Final Presentation


# Format

---

Lecturing is boring! Instead, we want pairs of students to work towards the final brain-art project. Pairs will go through each week’s notebook, and fill in the code and run it. If it doesn’t work, no worries! We’ll have mentors floating around to help pairs debug or understand concepts better.

This is going to be a cross of our workshops from 2017-2018 and our initial Prezi workshops, but with less emphasis on hardware and more emphasis on sofware techniques and the brain.

# Core Concepts

---

### 02 ⋯ Graphing Data

- Graphing Data

    CSVs / FIFs

Conditional Random Fields ⋯ [CRF](https://en.wikipedia.org/wiki/Conditional_random_field)

Empirical risk minimization ⋯ [ERM](https://en.wikipedia.org/wiki/Empirical_risk_minimization)

Bias-Variance [Dilemma](https://en.wikipedia.org/wiki/Bias%E2%80%93variance_tradeoff)

Bayes Net Graphical Models

---

### 03 ⋯ Fast Fourier Transform ⋯ [FFT](https://en.wikipedia.org/wiki/Fast_Fourier_transform)

- [Time Series](https://en.wikipedia.org/wiki/Time_series)

    Time-series segmentation ⋯ [Markov](https://en.wikipedia.org/wiki/Time-series_segmentation)

[Models](https://en.wikipedia.org/wiki/Time_series#Models)

---

- Fast Fourier Transform ⋯ [FFT](https://en.wikipedia.org/wiki/Fast_Fourier_transform)

    Cooley-Tukey [ALGM](https://en.wikipedia.org/wiki/Cooley%E2%80%93Tukey_FFT_algorithm)

    Generalized distributive law ⋯ [GDL](https://en.wikipedia.org/wiki/Generalized_distributive_law)

- Discrete Fourier Transform ⋯ [DFT](https://en.wikipedia.org/wiki/Discrete_Fourier_transform)

    DFT [matrix](https://en.wikipedia.org/wiki/DFT_matrix)

- Noise Filter Types

    [Gaussian noise](https://en.wikipedia.org/wiki/Gaussian_noise)

    Signal-to-noise ratio ⋯ [SNR](https://en.wikipedia.org/wiki/Signal-to-noise_ratio)

    [Matched filter](https://en.wikipedia.org/wiki/Matched_filter)

    [ADC](https://en.wikipedia.org/wiki/Analog-to-digital_converter) [Digital filter](https://en.wikipedia.org/wiki/Digital_filter)

    [Nonlinear filter](https://en.wikipedia.org/wiki/Nonlinear_filter)

    Shannon's [[Noisy-channel coding](https://en.wikipedia.org/wiki/Noisy-channel_coding_theorem)] Theorem

    [Kalman filter](https://en.wikipedia.org/wiki/Kalman_filter) / linear quadratic estimation ⋯ LQE

- Noise Filtering Analysis

    [Autocorrelation Analysis](https://en.wikipedia.org/wiki/Autocorrelation)

    [Spectral Analysis](https://en.wikipedia.org/wiki/Frequency_spectrum#Spectrum_analysis)

    [Spectrum analyzer](https://en.wikipedia.org/wiki/Spectrum_analyzer)

    Approximation Theory ⋯ [Polynomial](https://en.wikipedia.org/wiki/Approximation_theory)

    - [Curve Fitting](https://en.wikipedia.org/wiki/Curve_fitting)
        - [polynomial interpolation](https://en.wikipedia.org/wiki/Polynomial_interpolation)
        - [spline interpolation](https://en.wikipedia.org/wiki/Spline_interpolation)

    [Classification](https://en.wikipedia.org/wiki/Statistical_classification)

    [Signal Estimation](https://en.wikipedia.org/wiki/Estimation_theory)

---

Frequency Analysis

[Multidimensional transform](https://en.wikipedia.org/wiki/Multidimensional_transform)

---

### 04 ⋯ Neuroscience Introduction

Neurons & Axons

Neuroanatomy

Rall’s Cable Theory

- Membrane Potential
    - Nernst
    - GHK
    - HH equations

Hodgkin-Huxley ⋯ HH

---

### 05 ⋯ Digital Signal Processing

Convolution

Impulse Responses

- Signal Types
    - Continuous Signal
    - Discrete Signal

    Continuous Processing

    Discrete Processing

---

Nyquist's Theorem

Aliasing

---

Filter Order

FIR v IIR

Filter Types

---

### 06 ⋯ EEG Oscillatory Processes

Electroencephalography ⋯ [EEG](https://en.wikipedia.org/wiki/Electroencephalography)

- [EEG Analysis Methods](https://en.wikipedia.org/wiki/EEG_analysis)

    Frequency domain methods

    Time domain methods

    Time-frequency domain methods

    Nonlinear methods

    ANN methods

---

[Neural Oscillation](https://en.wikipedia.org/wiki/Neural_oscillation)

[Computational Oscillation](https://en.wikipedia.org/wiki/Neural_oscillation#Mathematical_description)

[spike and wave Pathology](https://en.wikipedia.org/wiki/Spike_and_wave)

---

- GABA Brainwave Channels

    [Delta](https://en.wikipedia.org/wiki/Delta_wave) ⋯  0.1 - 3 Hz

    [Theta](https://en.wikipedia.org/wiki/Theta_wave) ⋯  4 – 7 Hz

    [Alpha](https://en.wikipedia.org/wiki/Alpha_wave) ⋯  8 – 12.5 Hz

    [Mu](https://en.wikipedia.org/wiki/Mu_wave) ⋯  7.5 – 12.5 Hz

    [Beta](https://en.wikipedia.org/wiki/Beta_wave) ⋯  12.5 – 30 Hz

    [Gamma](https://en.wikipedia.org/wiki/Gamma_wave) ⋯  32 – 100 Hz

[📹  V](http://www.fields.utoronto.ca/video-archive/static/2019/01/2757-19929/mergedvideo.ogv)ideo

[📈  P](http://www.fields.utoronto.ca/private/ML_GradCourse/Jan10.pdf)DF Slides

[http://www.fields.utoronto.ca/video-archive/static/2019/01/2757-19929/mergedvideo.ogv](http://www.fields.utoronto.ca/video-archive/static/2019/01/2757-19929/mergedvideo.ogv)

---

### 07 ⋯ AngularJS

MVC : MVVM

---

- MEAN Stack
    MongoDB
    ExpressJS
    AngularJS
    NodeJS

- Controller
    - Data Binding | index.html
```
            angular.min.js
            ng-bootstrap
            {{main.class}}
```
```
        $scope: 2-Way Binding
```
    - Controller   | main.js
```
            class.subclass
```
    - JS Objects   | main.js
```
            .class
```
- Components
    - Directives   | index.html
```
            <html ng-app="app">
            <div ng-controller="classObj string classObj">
            <ng-pluralize count="count" when="classObj"></ng-bootstrap>
```
    - Components   | components.js
```
            .class('class', function() {
            	return {
            		restrict:'',
            		translude: boolean,
            		scope: {},
            		controller: function($scope, $element) {
            			var obj = $scope.obj = [];
            			$scope.select = function(obj) {}
            		},
            		template:
            			'<add html here>'
            		}
            })
```
    - Localization | app.js
```
            angular.module('app', ['components'])
            
            .controller('classObj', function($scope, $locale) {
            	$scope.class = [];
            	if ($locale.id == 'html-syntax') {
            		$scope.classObj = {};
            	}
            	else {
            		$scope.classObj = {};
            	}
            });
```
---

- Angularity Unique

    Deep Link : AJAX Navigation

    ng-form Validation

    Async Backend Return

    inject test in main() 

---

### 08 ⋯ Generative Signal Processing Art

---

### 09 ⋯ [Neuromodulation](https://en.wikipedia.org/wiki/Neuromodulation)
Gamma-aminobutyric acid ⋯ [GABA](https://en.wikipedia.org/wiki/Gamma-aminobutyric_acid)

---

### 10 ⋯ MusicJ Framework

