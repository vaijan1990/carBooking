$(function () {

  var myFilters = {
    auto: false,
    towbar: true,
    seats2: false,
    seats5: true,
    seats7: true
  };
  $.getJSON("/cars", function(result){

  })
  .done(function(result) {
    //checks if any filter is set
      $.each(myFilters, function(key, value) {
      if (value && (key == "auto" || key == "towbar")) {
        result = result.filter(function(attr) {
            if (attr[key] == true) {
              return attr;
            }
          })
      } else if (value) {
        result = result.filter(function(attr) {
            if ((myFilters.seats2 == true && attr.seats == 2) || (myFilters.seats5 == true && attr.seats == 5) || (myFilters.seats7 == true && attr.seats == 7)) {
              return attr;
            }
        })
      }
      })
      console.log(result);
      result.forEach(function(car) {
        $( "#car-table" ).append( "<tr><td>" + car.brand + "</td><td>"  + car.seats + "</td><td>" + car.auto + "</td><td>" + car.towbar + "</td><td>" + car.priceperday + "</td></tr>");
      })


  })
  .fail(function(result) {
    console.log(result);
  })


});
