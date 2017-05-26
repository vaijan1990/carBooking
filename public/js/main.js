
$(function () {
  $.fn.datepicker.defaults.format = "D dd of MM yyyy";
  $.fn.datepicker.defaults.weekStart = 1;
  $.fn.datepicker.defaults.orientation = 'bottom';
  $('.datepicker').datepicker();
});
