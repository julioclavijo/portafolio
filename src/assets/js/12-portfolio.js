$(function() {
        var selectedClass = "";
        $(".btn").click(function(){
        selectedClass = $(this).attr("data-rel");
     $("#portafolio").fadeTo(100, 0.1);
        $("#portafolio div").not("."+selectedClass).fadeOut().removeClass('scale-anm');
    setTimeout(function() {
      $("."+selectedClass).fadeIn().addClass('scale-anm');
      $("#portafolio").fadeTo(300, 1);
    }, 300);
    });
});
