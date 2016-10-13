 $(document).ready(function() {

     $.ajax({
        url:'/lastEightMonths',
        type:'get',
        dataType:'json',
        success:function(data){
            var mydata=data;
            if(typeof data=='string'){
                mydata=JSON.parse(mydata);
            }
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
        }
     });
     
 });
