var curData = [];
curData.push({x: 1, y: 1});

nv.addGraph(function() {
  var chart = nv.models.lineChart();
  
  d3.select('#graph svg')
      .datum(updatingData())
      .call(chart);
      
  nv.utils.windowResize(chart.update);
  
  return chart;
});



 
 function updatingData() {
 
   return [
     {
       values: curData,
       key: 'Sine Wave',
       color: '#ff7f0e'
     }
   ];
 }