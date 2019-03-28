#include "Tone_Gen.h"

Tone_Gen::Tone_Gen(double sampleRate) : _sampleRate(sampleRate), _s(0), _lastSample(0) {
}

double Tone_Gen::getSample() const
{
    return _lastSample;
}

double Tone_Gen::nextSample(double frequency, double amplitude)
{
    _s += frequency / _sampleRate;
    _lastSample = amplitude * sin(2*M_PI * _s);
    return _lastSample;
}

void Tone_Gen::reset() {
	_s = 0;
}
