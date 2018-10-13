/**	
	* Version: 1.0	
	* Author: Farhadur Rahim (webmechanicx)
	* Author URI: https://themeforest.net/user/webmechanicx

	Custom JS
	
	01. Navigation code for smooth scroll section
	02. Initiate WOW Effects
	03. Activate Feedback Slider
	04. Activate Status Number Counter 
	05. Ajax Contact Form Submission
	06. Preloader
	
**/

(function ($) {
    'use strict';
    
    var parentDom = $('html, body');
    
	// 01. Navigation code for smooth scroll sections
	
	$('#top-menu').on('click', '.page-scroll', function(event) {
		var $anchor = $(this);
		$(parentDom).stop().animate({
			scrollTop: ($($anchor.attr('href')).offset().top - 50)
		}, 450, 'easeInOutExpo');
		event.preventDefault();
	});
    
    
	// 02. Initiate WOW Effects
		
	new WOW().init();
    
    
    // 03. Activate Feedback Slider
    
    var $feedbackSlick = $('.feedbackslider');
    
    $feedbackSlick.owlCarousel({
        items: 3,
        margin: 20,
        loop: true,
        animateOut: 'fadeOutDown',
        animateIn: 'fadeInUp',
        smartSpeed:450,
        nav: false,
        autoplay: false,
        autoplayTimeout: 5000,
        autoplayHoverPause: false,
        responsiveClass:true,
        responsive: {
            0: {
                items: 1
            },
            732: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });
    
	// 04. Activate Status Number Counter 
		
	$('#contactus').one('inview', function(event, isInView) {
		if (isInView) {
			$('.stat-counter').countTo({
				onComplete: function (value) {
					if(this.data('symbol') != undefined) { 
						var symbol = this.data('symbol');
						value = value + symbol;
						$(this).text(value);
					}
				}					
			});
		}
	});
    
    
    // 05. Ajax Contact Form Submission
    
    var contactForm = $('#contact-form');

    $(contactForm).on('submit', function (e) {
        
        if (!e.isDefaultPrevented()) {

            var url = "php/contact.php";
            
            $.ajax({
            type: "POST",
            url: url,
            data: $(this).serialize(),
            success: function (data)
            {
                var messageAlert = 'alert-' + data.type;
                var messageText = data.message;
                
                var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                if (messageAlert && messageText) {
                    $(contactForm).find('.messages').html(alertBox);
                    $(contactForm)[0].reset();
                }
            }
            });
            return false;
        }
	});
    
	// 06. Preloader 
	
	$(window).on('load', function () {
		$('#preload-circle').fadeOut();
		$('.bounce-circles').fadeOut('slow', function () {
			$(this).remove();
		});
	});
	
})(jQuery);