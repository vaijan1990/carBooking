$(function () {

    //add warning color when a field is not filled in
    $(document).bind('change', function(e){
        if( $(e.target).is(':invalid') ){
            $(e.target).parent().addClass('invalid');
        } else {
            $(e.target).parent().removeClass('invalid');
        }
    });
});