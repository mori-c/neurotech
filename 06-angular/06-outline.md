06 - 
Week 06
March 4th 2019


## TOC
1. Angular
    Back-end for Brain Art Project
2. Review
3. EEG


---


### Following this [tutorial](https://angular.io/guide/quickstart)

To open Angular app:
```
ng serve --open
```
```
http://localhost:4200/
```

Review:

Fourier Transform = sine waves

IRF filter 
- output
- one is slow and fast
- higher order = accurate
- aliasing = fast samlpling and lose info
- frq type = goldilocks
- 60hz, sample at 120hz


Today 

EEG
- brainwaves
- neurons = volts = electrical output

- EEG physics:
    - electrical force (magnititude): (+) proton attraction towards (-) electron
    - close proximity
    - amount of charge, strength
    - electric field = *C* coulum of charge = ion's electric charge/field
        - (-) (+) (-)
        - joules (force) / newtown (distance) : work: amount of enegry over a distance
        - voltages = potential energy / unit charge
    - 

- oscillatory processes vs ERPs
    - ERP: event related potentials
        - 6-7hz back of the lobe for BCIs
        - aha moment/music - external/internal stimuli
        - random waves
        - originally thought readings are just on top of the brain (alpha)
        - p300 - target = biast reading jump when expecting a something
        - non-target = 
    - brainwaves graph
        -  delta waves .5-.3 cycle per seconds = brainwaves
        - alpha = tries and predictive autoencoding
        - temporal = waves changing over the time
        - thetha wave 

    - **10 -20 system** tolerance of each region and function
    - volume conduction / source locatization = motor function
        - electrodes align themselves in a linear fashion
  
///// how do you know where these fields are in the brain?
////// is this a brain frequency beat just like a heart frequency beat?


- power spectral analysis
    - temporal behaviour
        - neuron  
    - power distributed of frequency 


- noise
    - can cancel out with each other
    - use normal distrubution equation
    - ampify but noise would quiet itself
    - map target signal and noise, with ERP experiment, 
    - train ERP ml for noise
    - harmonic = double spike
    - bandstop filter removes harmonic noise
    - good eeg data, saltic solution, conductive gel, bald person, wash head, remove hair

- MEG
    - megnetoencephelogrphy
    - university of washington

Bold fMRI
    - spatial recog
    - temporal bad
    - infraded light


EROS fNIRS
    - beckman institute - cognative science lab
    - optical infrared




NPL - end of march