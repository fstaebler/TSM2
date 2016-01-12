var c = new AudioContext();
var r = c.sampleRate;
var ETS = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200];

var synthNote = function (frequency) {
  this.phase = 0.0;
  this.frequency = frequency;
  this.nextSample = () => {
    this.phase += this.frequency / r;
    this.phase %= 1;
    return this.phase;
  };
  this.skipSamples = (samples) => {
    this.phase += (this.frequency / r) * samples;
  }
};

var saw = (phase) => {
  return 2 * phase - 1;
}
var square = (phase) => {
  if (phase < 0.2)
    return -1;
  else
    return 1;
};

var sine = (phase) => {
  return Math.sin(phase * Math.PI * 2);
}

var loadedSynths = [];

var synth = function (processorFunction, params) {
  this.notes = [];
  this.parameters = (params != null) ? params : {
    gain: 0.1
  };
  this.onaudioprocess = (processorFunction != null) ? processorFunction : (o) => {
    var l = o.getChannelData(0);
    var r = o.getChannelData(1);
    for (var sample = 0; sample < o.length; sample++) {
      t++;
      for (var noteIndex = 0; noteIndex < this.notes.length; noteIndex++) {
        var currentPhase = this.notes[noteIndex].nextSample();
        l[sample] += saw(currentPhase) * this.parameters.gain;
        r[sample] += saw(currentPhase) * this.parameters.gain;
      }
    }
  };
};

var demoSynth = new synth();

loadedSynths.push(demoSynth);

var p = c.createScriptProcessor(1024, 0, 2);

var t = 0;

p.onaudioprocess = function (e) {
  var o = e.outputBuffer;
  for (var synthIndex = 0; synthIndex < loadedSynths.length; synthIndex++) {
    loadedSynths[synthIndex].onaudioprocess(o);
  }
};

p.connect(c.destination);

document.onkeydown = function (e) {};
document.onkeyup = function (e) {};
