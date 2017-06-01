$(function () {

  var myFilters = {
    auto: false,
    towbar: false,
    seats2: false,
    seats5: false,
    seats7: false
  };
  console.log(myFilters);
  $.getJSON("/cars", function(result){


  })
  .done(function(result) {
    console.log(result);
    //checks if any filter is set
    var filterSet = false;
    $.each(myFilters, function(key, value) {
      console.log(value)
      if (value)
        filterSet = true;
    })
    if (!filterSet) {
      result.forEach(function(car) {
        $( "#car-table" ).append( "<tr><td>" + car.brand + "</td><td>"  + car.seats + "</td><td>" + car.auto + "</td><td>" + car.towbar + "</td><td>" + car.priceperday + "</td></tr>");
      })
    } else {
      result.forEach(function(car) {
        if (car.auto == myFilters.auto && car.towbar == myFilters.towbar)
          $( "#car-table" ).append( "<tr><td>" + car.brand + "</td><td>"  + car.seats + "</td><td>" + car.auto + "</td><td>" + car.towbar + "</td><td>" + car.priceperday + "</td></tr>");
      })
    }

  })
  .fail(function(result) {
    console.log(result);
  })


});
