$(function () {

  var myFilters = {
    auto: true,
    towbar: true,
    seats2: false,
    seats5: false,
    seats7: false
  };
  $.getJSON("/cars", function(result){


  })
  .done(function(result) {
    //checks if any filter is set
    var filterSet = false;
    $.each(myFilters, function(key, value) {
      if (value)
        filterSet = true;
    })
    if (!filterSet) {
      result.forEach(function(car) {
        $( "#car-table" ).append( "<tr><td>" + car.brand + "</td><td>"  + car.seats + "</td><td>" + car.auto + "</td><td>" + car.towbar + "</td><td>" + car.priceperday + "</td></tr>");
      })
    } else {
      $.each(myFilters, function(key, value) {
        console.log(key);
        console.log(value);

      if (value) {
        result = result.filter(function(attr) {
          console.log("MAP start: ");
          console.log(attr[key]);
            if (attr[key] == true) {
              console.log("RETURN");
              return attr;
            }
          })
        }
      })
      console.log(result);
      result.forEach(function(car) {
        $( "#car-table" ).append( "<tr><td>" + car.brand + "</td><td>"  + car.seats + "</td><td>" + car.auto + "</td><td>" + car.towbar + "</td><td>" + car.priceperday + "</td></tr>");
      })
    }

  })
  .fail(function(result) {
    console.log(result);
  })


});
