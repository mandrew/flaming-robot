/* Menu - uses hoverIntent to control dropdown */
(function() {
    function showMenu(){
		$(this).find(".menu2").addClass("hover");
	}
	function hideMenu(){
		$(this).find(".menu2").removeClass("hover");
	}
    var config = {
    	sensitivity: 5,
    	interval: 100,
    	over: showMenu,		// function = onMouseOver callback (REQUIRED)
    	timeout: 400,		// number = milliseconds delay before onMouseOut
    	out: hideMenu		// function = onMouseOut callback (REQUIRED)
    };
    $(".js-navbar ul li").hoverIntent( config );
})();

(function() {
    /* HomePage: carousel */
    var $carousel = $('.carousel').flickity({
        prevNextButtons: false,
        pageDots: false,
        percentPosition: true,
        wrapAround: false,
        freeScroll: true,
        contain: true
    });
    // Flickity instance
    var flkty = $carousel.data('flickity');
    // elements
    var $cellButtonGroup = $('.button-group--cells');
    var $cellButtons = $cellButtonGroup.find('.button');

    // update selected cellButtons
    $carousel.on( 'select.flickity', function() {
        $cellButtons.filter('.is-selected')
            .removeClass('is-selected');
        $cellButtons.eq( flkty.selectedIndex )
            .addClass('is-selected');
    });

    // select cell on button click
    $cellButtonGroup.on( 'click', '.button', function() {
      var index = $(this).index();
      $carousel.flickity( 'select', index );
    });

})();
