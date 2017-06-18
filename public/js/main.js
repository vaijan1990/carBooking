$(function () {

    var carsIds = [];
    var startdate, enddate;

    //add warning color when a field is not filled in
    $(document).bind('change', function (e) {
        if ($(e.target).is(':invalid')) {
            $(e.target).parent().addClass('invalid');
        } else {
            $(e.target).parent().removeClass('invalid');
        }
    });

    $('#car-table-body').on('click', (e) => {

        var carTableRow = $(e.target).parents('tr');
        var extractedId;
        startdate = document.getElementById('startdate').value;
        enddate = document.getElementById('enddate').value;
        console.log('dates', startdate, enddate);

        if (carTableRow.hasClass('customer-selection')) {
            carTableRow.removeClass('customer-selection');
            extractedId = carTableRow.data('identifier');

            carsIds.filter((id, index) => {
                if (id === extractedId) {
                    console.log("this is the id that should be taken away", id)
                    carsIds.splice(index, 1);
                    console.log("this id is deleted", id);
                    console.log(carsIds);
                }
            })
        }
        else {
            carTableRow.addClass('customer-selection');
            extractedId = carTableRow.data('identifier');
            console.log('this id is added', extractedId);
            carsIds.push(extractedId);
        }

    });

    $('#sign-up').on('click', () => {

        console.log(startdate, enddate);

        $.redirect('../customers/checkout', {carIds: carsIds, startdate: startdate, enddate: enddate})

    });
    $('#confirm').on('click', () => {

        var selectedcarIds = document.getElementById('carId').value;

        var confirmedstartdate = document.getElementById('startdate').value;
        var confirmedenddate = document.getElementById('enddate').value;


        $.redirect('../customers/confirm', {
            selectedcarIds: selectedcarIds,
            confirmedstartdate: confirmedstartdate,
            confirmedenddate: confirmedenddate
        })

    });

    $('#view-booking').on('click', () => {
        $.redirect('/customers/summary')
    });

    $('#filterSeat').on('change', () => {
          var rex = new RegExp($('#filterSeat').val());
          if(rex =="/all/")
          {
              $('#filterSeat').val('');
            		$('.content').show();
            	}

          else{
			$('.content').hide();
			$('.content').filter(function() {
         var $t = $(this).children(":eq(" + "1" + ")");
			 return rex.test($t.text());
			}).show();
	   }
});

    $('#filterTowbar').on('change', () => {
       rex = new RegExp($('#filterTowbar').val());
      if(rex =="/all/")
      {
          $('#filterTowbar').val('');
            $('.content').show();
          }

      else{
  $('.content').hide();
  $('.content').filter(function() {
     var $t = $(this).children(":eq(" + "2" + ")");
   return rex.test($t.text());
  }).show();
 }
        });


    $('#booking-order-form').on('click', (e) => {
        e.preventDefault();

       var target = $(e.target);
       var id;

       if(target.hasClass('confirm-cancel')){
           id = target.data('identifier')
           $.redirect('/customers/cancel', {carId: id})
       }
    });

});
