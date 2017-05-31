$(function () {
  //datepicker configuration
  $.fn.datepicker.defaults.format = "D dd of MM yyyy";
  $.fn.datepicker.defaults.weekStart = 1;
  $.fn.datepicker.defaults.orientation = 'bottom';
  $('.datepicker').datepicker();



  //listeners
  $('#datepicker-from').on('input', function() {
    console.log()
  });

  $('#datepicker-to').on('input', function() {
    $(this).val() // get the current value of the input field.
  });


  $("#checkAvailibilty").submit(function(e) {
    $("#datepicker-from-hidden").val($("#datepicker-from").data('datepicker').getFormattedDate('yyyy-mm-dd'));
    $("#datepicker-to-hidden").val($("#datepicker-to").data('datepicker').getFormattedDate('yyyy-mm-dd'));
  });

});
