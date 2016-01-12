var fft = function (data) {
  console.log(data.length);
  console.log(data);

  var compExp = function (exR, exIm) {
    var er = Math.exp(exR);
    dst[0] = er * Math.cos(exIm);
    dst[1] = er * Math.sin(exIm);
    return dst;
  };

  var lowerResult = function (g, u) {};

  resultRe = new Float32Array(1024);
  resultIm = new Float32Array(1024);



  return resultRe;
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
    dataRe[k] = t2Re + evenRe[k];
    dataIm[k] = t2Im + evenIm[k];
    dataRe[k + hn] = evenRe[k] - t2Re;
    dataIm[k + hn] = evenIm[k] - t2Im;
  }
  return [dataRe, dataIm];
};

fft = rFFT; //debug
