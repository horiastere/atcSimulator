$( document ).ready(function() {
         
  $('.main-cta').on( "click", function(e) {
    e.preventDefault();
    
    airportName = $(this).attr('data-value');

    $('.start-game-screen').hide();

    initMap();
  });
});