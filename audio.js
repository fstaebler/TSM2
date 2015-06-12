var c = new AudioContext();
var r = c.sampleRate;
var ETS = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200];

var p = c.createScriptProcessor(1024, 0, 2);

var phaseProvider = function () {
  this.phase = 0.0;
  this.nextSample = function (frequency) {
    this.phase += frequency / r;
    this.phase %= 1;
    return this.phase
  };
};
var t = 0;
var prov = new phaseProvider();

var saw = function (phase) {
  return 2 * phase - 1;
}
var square = function (phase) {
  if (phase < 0.5)
    return -1;
  else
    return 1;
};

p.onaudioprocess = function (e) {
  var o = e.outputBuffer;
  var l = o.getChannelData(0);
  var r = o.getChannelData(1);
  for (var sample = 0; sample < o.length; sample++) {
    t++;
    var currentPhase = prov.nextSample(45);
    l[sample] = square(currentPhase);
    r[sample] = saw(currentPhase);
  }
};

p.connect(c.destination);