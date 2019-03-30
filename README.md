# Introduction to Neurotechnology

University of Toronto  |  [NeuroTech](https://www.facebook.com/events/580805392331663)  |  [2019](https://github.com/neurotechuoft/Workshops)

<br>

## Format

Pairs of students to work towards the final brain-art project. Pairs will go through each week’s notebook, and fill in the code and run it. If it doesn’t work, no worries! We’ll have mentors floating around to help pairs debug or understand concepts better.

This is going to be a cross of our workshops from 2017-2018 and our initial Prezi workshops, but with less emphasis on hardware and more emphasis on sofware techniques and the brain.


<!-- ## Topics

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
11. Final Presentation -->

<br>

## General Outline

1. [Python Introduction](#01)  ﹊  <sup>21/1/19</sup>

2. [Git & Data](#02)  ﹊  <sup>28/1/19</sup>
* Introduction to Git
* Signal Processing Data
* Graphing Data

3. [Neuroscience Introduction](#03)  ﹊  <sup>04/2/19</sup>
* Brief history on neuroscience
* Neuroanatomy
* Rall's Cable Theory
* Membrane potential

4. [Noise Filtering](#04)  ﹊  <sup>11/2/19</sup>
 * FFT ⋯ Fast Fourier Transform Introduction

5. Reading Week ⃗ <sup>18/2/19</sup>

6. [Digital Signal Processing](#06) ⋯ [⿻](https://github.com/mori-c/uoft-neurotech/blob/master/2019/workshop_2018_2019/notes/Workshop5.pdf)  ﹊  <sup>4/3/19</sup>
* Overview 
* Signal Processing
* Signal Classification Types
* Signal Systems

7. [EEG Oscillation Processes](#07) ⋯ [⿻](https://github.com/mori-c/uoft-neurotech/blob/master/2019/workshop_2018_2019/notes/Workshop6.pdf) ﹊  <sup>11/3/19</sup> 
* What exactly is Electroencephalography
* GABA Brainwave Channels
* EEG Physics
* Oscillatory processes vs ERPs
* Power spectral analysis for EEG power bands
  
8. [AngularJS](#08) ﹊ <sup>18/3/19</sup>
* AngularJS
* ~~Advanced Git~~
* ~~Offline Data, and Dataset~~
* Work session

9. [Generative Brain Art Starter & MuseJs Framework](#09) ﹊ <sup>25/3/19</sup> 
* Intro starter to Brain Art Project
* MuseJs Introduction 
* Brain Art architecture
* Brain artwork session (online)
* Work session

10. [EEG Generative Art Project Presentation](#010) ﹊ <sup>01/4/19</sup>

<br>
<br>


# Core Concepts


### 🐍  ⋯  <a name="01">Python</a>
---
ˉ  ϟ  ↑  ⑇  ⤻  

<br>

### ፨  ⋯  <a name="02">Graphing Data</a>
---
Git

GitHub

Signal Processing Data 

* [CRF](https://en.wikipedia.org/wiki/Conditional_random_field) ⋯ Conditional Random Fields 
* [ERM](https://en.wikipedia.org/wiki/Empirical_risk_minimization) ⋯ Empirical risk minimization
* Bias-Variance [Dilemma](https://en.wikipedia.org/wiki/Bias%E2%80%93variance_tradeoff)
* [Signal Processing](https://github.com/neurotechuoft/Workshops/tree/master/workshop_2018_2019/notebooks) Notebook

Graphing Data

* CSVs
* FIFs
* Bayes Net Graphical Models
* Graphing data with Matplotlib

<br>

### 🧠  ⋯  <a name="03">Neuroscience</a>

---

Overview

* Neurons
* Axons
* Neuroanatomy
* Gamma-aminobutyric acid ⋯ [GABA](https://en.wikipedia.org/wiki/Gamma-aminobutyric_acid)

[Neuromodulation](https://en.wikipedia.org/wiki/Neuromodulation)

Rall’s Cable Theory

Membrane potential

* Nernst
* GHK
* HH ⋯ Hodgkin-Huxley Equations

<br>

### 🎧  ⋯  <a name="04">Noise Filtering</a>

---

[Noise Filtering Types](https://mailchi.mp/f0e9cca4a344/week-4-readings)

* [Gaussian noise](https://en.wikipedia.org/wiki/Gaussian_noise)
* Signal-to-noise ratio ⋯ [SNR](https://en.wikipedia.org/wiki/Signal-to-noise_ratio)
* [Matched filter](https://en.wikipedia.org/wiki/Matched_filter)
* [ADC](https://en.wikipedia.org/wiki/Analog-to-digital_converter) ⋯ [Digital filter](https://en.wikipedia.org/wiki/Digital_filter)
* [Nonlinear filter](https://en.wikipedia.org/wiki/Nonlinear_filter)
* Shannon's [[Noisy-channel coding](https://en.wikipedia.org/wiki/Noisy-channel_coding_theorem)] Theorem
* [Kalman filter](https://en.wikipedia.org/wiki/Kalman_filter) / linear quadratic estimation ⋯ LQE

Noise Filtering Analysis

* [Autocorrelation Analysis](https://en.wikipedia.org/wiki/Autocorrelation)
* [Spectral Analysis](https://en.wikipedia.org/wiki/Frequency_spectrum#Spectrum_analysis)
* [Spectrum analyzer](https://en.wikipedia.org/wiki/Spectrum_analyzer)
* Approximation Theory ⋯ [Polynomial](https://en.wikipedia.org/wiki/Approximation_theory)
* [Curve Fitting](https://en.wikipedia.org/wiki/Curve_fitting)
    * [polynomial interpolation](https://en.wikipedia.org/wiki/Polynomial_interpolation)
    * [spline interpolation](https://en.wikipedia.org/wiki/Spline_interpolation)
* [Classification](https://en.wikipedia.org/wiki/Statistical_classification)
* [Signal Estimation](https://en.wikipedia.org/wiki/Estimation_theory)

Frequency Analysis

[Multidimensional transform](https://en.wikipedia.org/wiki/Multidimensional_transform)

[Time Series](https://en.wikipedia.org/wiki/Time_series)

* [Markov](https://en.wikipedia.org/wiki/Time-series_segmentation) Time-Series Segmentation
* [Models](https://en.wikipedia.org/wiki/Time_series#Models)

[FFT](https://en.wikipedia.org/wiki/Fast_Fourier_transform) ⋯ Fast Fourier Transform

* Cooley-Tukey [ALGM](https://en.wikipedia.org/wiki/Cooley%E2%80%93Tukey_FFT_algorithm)    
* [GDL](https://en.wikipedia.org/wiki/Generalized_distributive_law) ⋯ Generalized distributive law

[DFT](https://en.wikipedia.org/wiki/Discrete_Fourier_transform) ⋯ Discrete Fourier Transform

* DFT [matrix](https://en.wikipedia.org/wiki/DFT_matrix)

<br>


### ⏦  ⋯  <a name="06">Digital Signal Processing</a>

---

Signals 

* Sampling Audio, Biological, Images, and Video Signals
* Fourier Analysis: Frequency Domain
* DTFT ⋯ Discrete Time Fourier Transform & Properties
* Aliasing: Overlapped Time & Frequency Signals Reconstructed
* Nyquist's Theorem
* Filter Designs
    * Filter Types
    * [FIR vs IIR](https://community.plm.automation.siemens.com/t5/Testing-Knowledge-Base/Introduction-to-Filters-FIR-versus-IIR/ta-p/520959)
    * Filter Order
    * Filter Characteristics
      
Signal Processing

* Analyzing & Modifying Signals
* Audio, Speech, Video, Image, Biological, Biomedical Imaging Application Variants
* Brain-Computer Interfaces

Signal Classifications Types

* x(t) Continuous vs x[n] Discrete
* Digital vs Analog
* 1D ⋯ x(t), v[n]
* 2D ⋯ f(x, t), images
* Unit Impluse (Delta) Function
* Periodic Signals
* Frequency
* Signal Manipulation

Systems

* Impulse responses
* System Properties
* LTI ⋯ Linear Time Invariant
    * Convolution

<br>

### ∿  ⋯ <a name="07">EEG Oscillation Processes</a> <!-- ⍼ -->

---

1. [Neural Oscillation](https://en.wikipedia.org/wiki/Neural_oscillation)

* [Computational Oscillation](https://en.wikipedia.org/wiki/Neural_oscillation#Mathematical_description)
    
2. Oscillation Processes

* [Spike and Wave Pathology](https://en.wikipedia.org/wiki/Spike_and_wave)

3. [EEG](https://en.wikipedia.org/wiki/Electroencephalography) ⋯ Electroencephalography

4. GABA Brainwave Channels
* [Delta](https://en.wikipedia.org/wiki/Delta_wave) ⋯  0.1 - 3 Hz
* [Theta](https://en.wikipedia.org/wiki/Theta_wave) ⋯  4 – 7 Hz
* [Alpha](https://en.wikipedia.org/wiki/Alpha_wave) ⋯  8 – 12.5 Hz
* [Mu](https://en.wikipedia.org/wiki/Mu_wave) ⋯  7.5 – 12.5 Hz
* [Beta](https://en.wikipedia.org/wiki/Beta_wave) ⋯  12.5 – 30 Hz
* [Gamma](https://en.wikipedia.org/wiki/Gamma_wave) ⋯  32 – 100 Hz

5. [EEG Analysis Methods](https://en.wikipedia.org/wiki/EEG_analysis)
* Frequency domain methods
* Time domain methods
* Time-frequency domain methods
* Nonlinear methods
* ANN methods

<br>

### 𝗔  ⋯  <a name="08">AngularJS</a>

---

Overview

* MVC : MVVM
* MEAN Stack
    * MongoDB
    * ExpressJS
    * AngularJS
    * NodeJS

Architecture Framework

* Controller

    ⋰  Data Binding | **index.html**
    ```
    angular.min.js
    ```
    ```
    ng-bootstrap
    ```
    ```
    {{main.class}}
    ```
    ```    
    $scope:
    # 2-Way Binding
    ```

    ⋰  Controller | **main.js**
    ```
    class.subclass
    ```

    ⋰  JS Objects | **main.js**
    ```
    .class
    ```

* Components

    ⋰  Directives | **index.html**
    ```      
    <html ng-app="app">
    <div ng-controller="classObj string classObj">
    <ng-pluralize count="count" when="classObj"></ng-bootstrap>
    ```

    ⋰  Components | **components.js**
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

    ⋰  Localization | **app.js**
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

Angularity Unique

* Deep Link Validation : AJAX Navigation
```
ng-form
```

* Async Backend Return
```
inject test in main() 
```

<br>

###  💆🏻‍♀️  ⋯  <a name="09">Generative Brain Art Starter, MuseJs Framework</a>

---

A. Getting Started
  * Project Overview
  * EEG Data Visualised
  * Brain art as generative art
  * AngularJS App
  
B. MuseJs Framework

C. Brain Art Architecture

<br>

### ⌅ ϟ  ⋯  <a name="10">EEG Generative Art Project Presentation</a>
---
ˉ  ϟ  ↑  ⑇  ⤻  

