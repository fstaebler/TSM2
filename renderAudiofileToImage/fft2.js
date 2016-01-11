//initializes the fft of length n. If direction is false, it's an FFT, else an iFFT
function init_fft(n, direction){
   var m  = parseInt(Math.log2(n)); //Sample size is n and bin size is the log to base 2

   //Verify that n is a power of 2
   if(n != (1<<m)){
      throw "n needs to be a power of two but was " + n;
   }

   var constant = direction ? -2 * Math.PI : 2 * Math.PI;

   //real and imaginary are arrays of float of size n (of the init_fft functions argument)
   //it returns an array of [real, imaginary] of the fft of the data
   return function(real, imaginary){
      var n2 = n / 2;
      function bitreverse(j, nu){
         var j2;
         var j1 = j | 0;
         var k = 0;
         for(var i = 1; i <= nu; i++){
            j2 = (j1 / 2)|0;
            k = (2 * k + j1 - 2 * j2)|0;
            j1 = j2;
         }
         return k;
      }

      var k = 0;
      var nu = m;
      var nu1 = m - 1;
      //Calculation
      for(var l = 1; l <= nu; l++){
         while(k < n){
            for(var i = 1; i <= n2; i++){
               var p = bitreverse(k >> nu1, nu);
               var arg = constant * p / n;
               var c = Math.cos(arg);
               var s = Math.sin(arg);
               var tReal = (real[k + n2] * c) + (imaginary[k + n2] * s);
               var tImag = (imaginary[k + n2] * c) - (real[k + n2] * s);
               real[k + n2] = real[k] - tReal;
               imaginary[k + n2] = imaginary[k] - tImag;
               real[k] += tReal;
               imaginary[k] += tImag;
            }
            k += n2;
         }
         k = 0;
         nu1 --;
         n2 /= 2;
      }

      //Recombination
      k = 0;
      while(k < n){
         var r = bitreverse(k, nu);
         if(r > k){
            var tReal = real[k];
            var tImag = imaginary[k];
            real[k] = real[r];
            imaginary[k] = imaginary[r];
            real[r] = tReal;
            imaginary[r] = tImag;
         }
         k++;
      }

      //Normalize?
      /*
      var radice = 1 / Math.sqrt(n);
      for(var i = 0; i < n; i++){
         real[i] = real[i] * radice;
         imaginary[i] = imaginary[i] * radice;
      }
      */

      return [real, imaginary];

   }
}
