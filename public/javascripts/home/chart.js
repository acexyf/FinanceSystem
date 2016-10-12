 $(document).ready(function() {
 
 'use strict'; 

           Morris.Area({
            element: 'hero-area',
            data: mydata,
            xkey: 'period',
            ykeys: ['count'],
            labels: ['count'],
            hideHover: 'auto',
            lineWidth: 2,
            pointSize: 10,
            lineColors: ['#72d0eb'],
           
            fillOpacity: 1.0,
            smooth: true
		//pointFillColors: ['#00ff00']
        });
      });