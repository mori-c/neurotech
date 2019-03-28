#include "math.h"

#ifndef TONE_GEN_H
#define TONE_GEN_H

class Tone_Gen {
    private:
        const double _sampleRate;
        double _s; /* current position along the unit sine curve */
        double _lastSample;
    public:
        double getSample() const;
        double nextSample(double frequency, double amplitude);
        void reset();
        Tone_Gen(double sampleRate); // constructor
};

#endif
