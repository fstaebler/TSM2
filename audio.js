var c = new AudioContext();
var r = c.sampleRate;
var ETS = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200];

var p = c.createScriptProcessor(2048, 0, 2);

var phaseProvider = function () {
  this.phase = 0.0;
  this.nextSample = function (frequency) {
    this.phase += frequency / r;
    this.phase %= 1;
    return this.phase
  };
};
var note
var t = 0;
var prov = new phaseProvider();

var saw = function (phase) {
  return 2 * phase - 1;
}
var square = function (phase) {
  if (phase < 0.2)
    return -1;
  else
    return 1;
};
var sine = function (phase) {
  return Math.sin(phase * Math.PI * 2);
}

p.onaudioprocess = function (e) {
  var o = e.outputBuffer;
  var l = o.getChannelData(0);
  var r = o.getChannelData(1);
  for (var sample = 0; sample < o.length; sample++) {
    t++;
    var currentPhase = prov.nextSample(noteToFreq(currentNote, 1));
    l[sample] = sine(currentPhase);
    r[sample] = sine(currentPhase);
  }
};

p.connect(c.destination);

var currentNote = "C";

document.onkeydown = function (e) {
  var keycodes = [65, 87, 83, 68, 82, 70, 71, 90, 72, 85, 74, 73, 75];
  if (keycodes.indexOf(e.keyCode) != -1) {
    currentNote = notes[keycodes.indexOf(e.keyCode)];
    console.log(currentNote);
  }
};
document.onkeyup = function (e) {};