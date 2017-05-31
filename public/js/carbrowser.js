$(function () {

  filter = "/cars";

  $.getJSON(filter, function(result){


  })
  .done(function(result) {
    console.log(result);
    result.forEach(function(car) {
    $( "#car-table" ).append( "<tr><td>" + car.brand + "</td><td>"  + car.seats + "</td><td>" + car.auto + "</td><td>" + car.towbar + "</td><td>" + car.priceperday + "</td></tr>");
    })
  })
  .fail(function(result) {
    console.log(result);
  })


});
