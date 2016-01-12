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

/*
function cfft(amplitudes)
{
	var N = amplitudes.length;
	if( N <= 1 )
		return amplitudes;

	var hN = N / 2;
	var even = [];
	var odd = [];
	even.length = hN;
	odd.length = hN;
	for(var i = 0; i < hN; ++i)
	{
		even[i] = amplitudes[i*2];
		odd[i] = amplitudes[i*2+1];
	}
	even = cfft(even);
	odd = cfft(odd);

	var a = -2*Math.PI;
	for(var k = 0; k < hN; ++k)
	{
		if(!(even[k] instanceof Complex))
			even[k] = new Complex(even[k], 0);
		if(!(odd[k] instanceof Complex))
			odd[k] = new Complex(odd[k], 0);
		var p = k/N;
		var t = new Complex(0, a * p);
		t.cexp(t).mul(odd[k], t);
		amplitudes[k] = even[k].add(t, odd[k]);
		amplitudes[k + hN] = even[k].sub(t, even[k]);
	}
	return amplitudes;
}*/
fft = rFFT; //debug
