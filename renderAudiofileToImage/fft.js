function init_fft(n){
   var m  = parseInt(Math.log2(n)); //Sample size is n and bin size is the log to base 2
   this.cos = []; this.sin = []; // Lookup tables we only need to compute oncomplete
   var blackman_window; //Lookup table for the blackman window for the FFT
   //Verify that n is a power of 2
   if(n != (1<<m)){
      throw "n needs to be a power of two but was " + n;
   }
   //Compute the lookup tables
   console.log("computing lookup tables");
   for(var i = 0; i < n; i++){
      cos[i] = Math.cos(-2 * Math.PI * i / n)
      sin[i] = Math.sin(-2 * Math.PI * i / n)
   }
   //Compute blackman window
   for(var i = 0; i < n; i++){
      window[i] = 0.42 - 0.5 * Math.cos(2 * Math.PI * i / (n - 1)) + 0.08 * Math.cos(4 * Math.PI * i / (n - 1));
   }

   //real and imaginary are arrays of float of size n (of the init_fft functions argument)
   //it returns an array of [real, imaginary] of the fft of the data
   return function(real, imaginary){
      var i,j,k;//Iterators
      var n1, n2;//Bincounters
      var a;//Accumulator
      var c, s; //Cosine and sine
      var t1, t2; //Temporary variables for swapping values

      //Bitreverse
      j = 0;
      n2 = n / 2;
      for(i = 1; i < n -1; i++){
         n1 = n2;
         while (j >= n1){
            j = j - n1;
            n1 = n1 / 2;
         }
         j = j + n1;

         if(i < j){
            t1 = real[i];
            real[i] = real[j];
            real[j] = t1;
            t1 = imaginary[i];
            imaginary[i] = imaginary[j];
            imaginary[j] = t1;
         }
      }




      // FFT
      for(i = 0; i < m; i++){
         n1 = n / 2;
         n2 = n;
         a = 0;
         for(j = 0; j < n1; j++){
            c = cos[a];
            s = sin[a];
            if(isNaN(c)){console.log("c is NaN at a=" + a); return undefined;}
            if(isNaN(s)){console.log("s is NaN at a=" + a); return undefined;}
            a += 1 << (m - i - 1);
            for(k = j; k < n; k = k + n2){
               t1 = (c * real[k + n1]) - (s * imaginary[k + n1]);
               t2 = (s * real[k + n1]) + (c * imaginary[k + n1]);
               real[k + n1] = real[k] - t1;
               imaginary[k + n1] = imaginary[k] - t2;
               real[k] = real[k] + t1;
               imaginary[k] = imaginary[k] + t2;
            }

            var sum = 0;
            for(var x = 0; x < n; x++){
               sum += real[x];
               if(isNaN(real[x])){console.log("real is NaN at x " + x + " and j " + j);return undefined;}
            }
            console.log("real sum is " + sum + " and j " + j);

         }

      }


      return [real, imaginary];

   }
}
