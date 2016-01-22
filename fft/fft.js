var fft = function (dataRe, dataIm) {
  resultARe = new Float32Array(dataRe.length);
  resultAIm = new Float32Array(dataRe.length);
  if (!dataIm) dataIm = new Float32Array(dataRe.length);
  var pairdist = n / 2;
  var a = -2 * Math.PI;
  for (var i = 0; i < pairdist; i++) {
    var p = a * k / n;
    var tIm = Math.sin(p);
    var tRe = Math.cos(p);
  }

  for (var sw = dataRe.length / 2; sw > 1; sw /= 2) {

    for (var collect = 0; collect < hn; collect++) {}

  }



  return [resultRe, resultIm];
};

var fft2 = fft;

var rFFT = function (dataRe, dataIm) {
  var n = dataRe.length;
  if (n == 1) return [dataRe, dataIm];
  if (!dataIm) dataIm = new Float32Array(dataRe.length);
  var hn = n / 2;
  var evenRe = [];
  var evenIm = [];
  var oddRe = [];
  var oddIm = [];
  for (var i = 0; i < n; i++) {
    evenRe.push(dataRe[i]);
    evenIm.push(dataIm[i]);
    i++;
    oddRe.push(dataRe[i]);
    oddIm.push(dataIm[i]);
  }
  var ev = rFFT(evenRe, evenIm);
  evenRe = ev[0];
  evenIm = ev[1];
  var od = rFFT(oddRe, oddIm);
  oddRe = od[0];
  oddIm = od[1];
  var a = -2 * Math.PI;
  for (var k = 0; k < hn; k++) {
    var p = a * k / n;
    var tIm = Math.sin(p);
    var tRe = Math.cos(p);
    var t2Re = tRe * oddRe[k] - tIm * oddIm[k];
    var t2Im = tIm * oddRe[k] + tRe * oddIm[k];
    dataRe[k] = evenRe[k] + t2Re;
    dataIm[k] = evenIm[k] + t2Im;
    dataRe[k + hn] = evenRe[k] - t2Re;
    dataIm[k + hn] = evenIm[k] - t2Im;
  }
  return [dataRe, dataIm];
};

fft = rFFT; //debug
