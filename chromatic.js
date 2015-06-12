var notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

var noteToFreq(note, octave) {
  var freqs = [261.6, 277.2, 293.7, 311.1, 329.6, 349.2, 370, 392, 415.3, 440, 466.2, 493.9];
  var multiplier = (octave >= 1) ? freq : (1 / (1 + (octave * (-1))));
  return freqs[notes.indexOf[note]] * multiplier;
}
