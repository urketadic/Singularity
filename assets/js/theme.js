/* ========================================================================

M&M: theme.js
Main Theme JS file

@Author: Andrew ch 
@URL: http://andrewch.eu
 
=========================================================================
 */

'use strict';


jQuery(document).ready(function(  ) {
	$(".alert").hide();
	
	//Navigation Menu
	//===================
	$('.toggle-menu').jPushMenu({
		closeOnClickLink: true
	});


	$('.close-icon').on('click', function(){
		$( "#scroll-nav").addClass("animation");
	});

	//Sidebar Menu Items' Animation
	TweenMax.staggerTo(".cbp-spmenu ul.nav li", 0, {opacity:0, x:-50,y:+50}, 0);
	TweenMax.staggerTo(".cbp-spmenu img", 0, {opacity:0, x:-50,y:0}, 0);
	var clicked = false;
	$(".toggle-menu").on('click', function() {
		TweenMax.staggerTo(".cbp-spmenu ul.nav li", 0.3, {opacity:1, x:0,ease: Quart.easeOut}, 0.2);
		TweenMax.staggerTo(".cbp-spmenu img", 0.3, {opacity:1, x:0,y:0}, 0.2);
	});
	$(".close-menu").on('click', function() {
		TweenMax.staggerTo(".cbp-spmenu ul.nav li", 0.3, {delay:.2,opacity:0, x:-50,ease:Quart.easeOut}, 0.2);
		TweenMax.staggerTo(".cbp-spmenu img", 0.1, {opacity:0, x:-50,y:0}, 0.2);
	});
	// Dropdown expands
	$('.expander').simpleexpand();

	// Fixed Navigation Menu 
	$(window).scroll(function() {
		if ($(this).scrollTop() > 40) {
			$( ".navbar-fixed").removeClass("hidden");
				} else {
			$( ".navbar-fixed").addClass("hidden");
		}
	});

	//Scrollspy offset
	$("body").scrollspy({target: "#scroll-nav", offset:200});

	//Stellar
	//===================
	$.stellar({
		horizontalScrolling: false,
		verticalOffset: 0,
		responsive:true
	});
	//Home Slider
	//===================

	jQuery(function($) {
		var $owl = $('#head_panel_slider');			  
    		$owl.owlCarousel({
			items: 1,
			dots: true,
			autoplay:true,
			autoplayTimeout: 3000,
			loop:true,
			nav: true,
			autoplaySpeed: 1000,
			navSpeed: 1000,
			dotsSpeed: 1000,
			navText: [
			      "<i class='ion-ios-arrow-left'></i>",
			      "<i class='ion-ios-arrow-right'></i>"
			      ]
		});
		var $headPanelSliderOwlCarousel = $('#head_panel_slider.owl-carousel');
		$headPanelSliderOwlCarousel.find('.item .inner').addClass("hide pause_animation");
		$headPanelSliderOwlCarousel.find('.active .item .inner').removeClass("hide pause_animation");

		$owl.on('translated.owl.carousel', function(event) {
			$headPanelSliderOwlCarousel.find('.item .inner').addClass("hide pause_animation");
			$headPanelSliderOwlCarousel.find('.active .item .inner').removeClass("hide pause_animation");
		})
	});

	//Testimonal Slider
	//===================

	jQuery(function($) {
		var $owl = $('#testimonial-slider');			  
    		$owl.owlCarousel({
			items: 1,
			dots: true,
			autoplay:true,
			autoplayTimeout: 3000,
			loop:false,
			autoplayHoverPause: true
		});
	});

	// Init On scroll animations
	//======================
    
	function onScrollInit( items, trigger ) {
	    items.each( function() {
	        var osElement = $(this),
	            osAnimationClass = osElement.attr('data-os-animation'),
	            osAnimationDelay = osElement.attr('data-os-animation-delay');

	        osElement.css({
	            '-webkit-animation-delay':  osAnimationDelay,
	            '-moz-animation-delay':     osAnimationDelay,
	            'animation-delay':          osAnimationDelay
	        });

	        var osTrigger = ( trigger ) ? trigger : osElement;

	        osTrigger.waypoint(function() {
	            osElement.addClass('animated').addClass(osAnimationClass);
	        },{
	            triggerOnce: true,
	            offset: '90%'
	        });
	    });
	}

	Pace.on('done', function() {
	    setTimeout(function() {
	      onScrollInit( $('.os-animation') );
	      onScrollInit( $('.staggered-animation'), $('.staggered-animation-container') );
	    }, 500);
	});
    
	// Portfolio Isotope
	// =======================
	function isotopeInit() {
	    $('.masonry').each( function( index, element ) {
	        var $container = $(element);
	        var $items = $container.find( '.masonry-item' );
	        var padding = $container.attr( 'data-padding' );
	        var isFullWidth = $container.parents( '.container-fullwidth' ).length > 0;
	        // On fullscreen portfolio add negative margin on left and right and add 4pixel upon that for the loss after rounding
	        var containerPadding = -padding / 2;

	        $container.css({
	            margin: '0 ' + containerPadding + 'px'
	        });
	        $container.imagesLoaded().always( function( loadedContainer ) {
	            setTimeout( function() {
	                var columns = 3;
	                var screenWidth = $(window).width();

	                var wideColumns = 2;

	                if( screenWidth < 768 ) {
	                    columns = $container.attr( 'data-col-xs' );
	                    wideColumns = 1;
	                }
	                else if( screenWidth < 992 ) {
	                    columns = $container.attr( 'data-col-sm' );
	                    wideColumns =  1;
	                }
	                else if( screenWidth < 1200 ) {
	                    columns = $container.attr( 'data-col-md' );
	                    wideColumns =  2 ;
	                }
	                else if( screenWidth > 1200 ) {
	                    columns = $container.attr( 'data-col-lg' );
	                    wideColumns =  2 ;
	                }

	                // calculate item width and paddings
	                var itemWidth;
	                if ( $container.hasClass( 'use-masonry' ) ) {
	                    $items.each(function() {
	                        // Set the masonry column width
	                        itemWidth = Math.floor( $container.width() / columns );

	                        var item  = $(this);
	                        if( item.hasClass( 'masonry-wide' ) ) {
	                            item.css( 'width', itemWidth * wideColumns );
	                        }
	                        else {
	                            item.css( 'width', itemWidth );
	                        }
	                    });
	                }
	                else {
	                    itemWidth = Math.floor( $container.width() / columns );
	                    $items.css( 'width', itemWidth );
	                }

	                $items.find('.figure,.post-masonry-inner').css( 'padding', padding / 2 + 'px' );

	                // wait for possible flexsliders to render before rendering isotope
	                $container.isotope( {
	                    itemSelector: '.masonry-item',
	                    getSortData : {
	                        default: function ( $elem ) {
	                            return parseInt( $elem.attr( 'data-menu-order',10 ) );
	                        },
	                        title: function ( $elem ) {
	                            return $elem.attr( 'data-title' );
	                        },
	                        date: function ( $elem ) {
	                            return Date.parse( $elem.attr( 'data-date' ) );
	                        },
	                        comments: function( $elem ) {
	                            return parseInt( $elem.attr( 'data-comments',10 ) );
	                        }
	                    },
	                    sortBy: 'default',
	                    layoutMode: $container.attr( 'data-layout' ),
	                    resizable: false,
	                    masonry: {
	                        columnWidth: itemWidth,
	                        gutter: padding
	                    }
	                }, function(){
	                    // refresh waypoints after layout
	                    $.waypoints('refresh');
	                    $container.removeClass( 'no-transition' );
	                    onScrollInit( $items.find( '.portfolio-os-animation' ), $container );
	                    onScrollInit( $items.find( '.blog-os-animation' ), $container );
	                });
	            },200);
	            
	            // Gallery Sorting
	            // store filter for each group
	              var filters = {};

	              $('#content').on( 'click', 'a.portfolio-filter', function() {
	                var $this = $(this);
	                // get group key
	                var $buttonGroup = $this.parents('.data-filter-categories');
	                var filterGroup = $buttonGroup.attr('data-filter');
	                // set filter for group
	                filters[ filterGroup ] = $this.attr('data-filter');
	                // combine filters
	                var filterValue = '';
	                for ( var prop in filters ) {
	                  filterValue += filters[ prop ];
	                }
	                // set filter for Isotope
	                $container.isotope({ filter: filterValue });
	              });
	        });
	    });
	}

	// Re initialise isotope on window resize
	$(window).smartresize(function(){
	    isotopeInit();
	});

	// Init the isotope
	isotopeInit();

	//Filters Animation
	TweenMax.staggerTo("ul.data-filter-categories li .portfolio-filter", 0, {opacity:0, y:+50}, 0.2);
	var clicked = false;
	$("i.filter-icon").on('click', function() {
		if(clicked){
			TweenMax.to("ul.data-filter-categories li .portfolio-filter", 0.1, {opacity:0, y:+50,ease:Quart.easeOut}, 0.1);
			$("i.filter-icon").removeClass("rotated-back");
			$("i.filter-icon").addClass("rotated");
		}else{
			TweenMax.staggerTo("ul.data-filter-categories li .portfolio-filter", 0.1, {opacity:1, y:0,ease:Quart.easeOut}, 0.08);
			$("i.filter-icon").removeClass("rotated");
			$("i.filter-icon").addClass("rotated-back");
		}
		clicked = !clicked;
	});
	    
	// Magnific Image Popup
	// ======================
	$('.magnific').magnificPopup({
		type:'image',
		removalDelay: 300,
		mainClass: 'mfp-fade'
	});

	// Magnific Video Popup
	// ======================
	$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: true
	});

	// Magnific Gallery Popup
	// ======================
	$('.popup-gallery').magnificPopup({
	    delegate: 'a',
	    type: 'image',
	    tLoading: 'Loading image #%curr%...',
	    mainClass: 'mfp-img-mobile',
	    gallery: {
	        enabled: true,
	        navigateByImgClick: true,
	        preload: [0,1] // Will preload 0 - before current, and 1 after the current image
	    },
	    image: {
	        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
	        titleSrc: function(item) {
	            return item.el.attr('title') + '<small>Another gallery example.</small>';
	        }
	    }
	});

	// Countdown
	// ======================
	$('.counter').each(function() {
	    var $counter = $(this);
	    var $odometer = $counter.find('.odometer-counter');
	    if($odometer.length > 0 ) {
	        var od = new Odometer({
	            el: $odometer[0],
	            value: $odometer.text(),
	            format: $counter.attr('data-format')
	        });
	        $counter.waypoint(function() {
	            window.setTimeout(function() {
	                $odometer.html( $counter.attr( 'data-count' ) );
	            }, 500);
	        },{
	            triggerOnce: true,
	            offset: 'bottom-in-view'
	        });
	    }
	});

	// Goto top button
	// ======================
	jQuery(window).scroll(function () {
	    if (jQuery(this).scrollTop() > 100) {
		jQuery('.go-top').addClass('visible');
	    } else {
		jQuery('.go-top').removeClass('visible');
	    }
	});
	$('.go-top i').click(function(event) {
		event.preventDefault();
		{$('html, body').velocity('scroll',{duration: 1000, offset:0});}
	});

	// Modals 
	// ======================

	// Function we call to close the currently open modal
  window.closeModal = $.magnificPopup.close

  // If user navigates away from a modal (like pressing browser back button)
  // we close the modal
	$(window).bind('hashchange', function () {
    // check if url contains 'gallery'
    if (window.location.hash.indexOf('gallery') === -1 || location.hash == null) {
			// url doesnt contains 'gallery', so we will close the gallery modal
    	console.info('close modal')
      $.magnificPopup.close()
    }
  });

	$('.open-gallery-link').click(function() {
		var itemNum = $(this).data("slideid");

		//console.log(itemNum)
		var items = [];
		$( $(this).attr('href') ).find('.slide').each(function() {
			items.push( {
				src: $(this) 
			} );
		});

		$.magnificPopup.open({
			items:items,
				gallery: {
					arrowMarkup: '<button title="%title%" type="submit" class="mfp-arrow mfp-arrow-%dir%"></button>',
					enabled: true,
					fixedContentPos: true,
					callbacks: {
						beforeOpen: function() { $('html').addClass('mfp-helper'); },
						close: function() { $('html').removeClass('mfp-helper'); }
					}
				}
			},itemNum);
	});

	// Smooth Scroll
	// bind click event to all internal page anchors
	$("a[href*=#]").bind("click", function(e) {
		// prevent default action and bubbling
		// e.preventDefault();
		e.stopPropagation();
		// set target to anchor's "href" attribute
		var target = $(this).attr("href");
		// scroll to each target
		$(target).velocity("scroll", {
			duration: 1000,
			offset: 0,
			easing: "ease-in-out"
		});
	});
});


function cShowMe(WhatToShow) {
  if(WhatToShow == 1)  {
   document.getElementById("ShowFrameID").src = "https://www.youtube.com/embed/iWEhY-76sIo" ;
   $(this).closest("iframe")
  }
  else if(WhatToShow ==2) {
   document.getElementById("ShowFrameID").src = "https://www.youtube.com/embed/IHy347sXBY8" ;
  }
  else if(WhatToShow ==3) {
   document.getElementById("ShowFrameID").src = "https://www.youtube.com/embed/xtwwBsLuLzE" ;
  }
  else if(WhatToShow ==4) {
   document.getElementById("ShowFrameID").src = "https://www.youtube.com/embed/pH42OK7QNvw";
  }
  else if(WhatToShow ==5) {
   document.getElementById("ShowFrameID").src = "https://www.youtube.com/embed/_XoRkoHPht0" ;
  }
  else if(WhatToShow ==6) {
   document.getElementById("ShowFrameID").src = "https://www.youtube.com/embed/emjw5zspa94" ;
  }
  else if(WhatToShow ==7) {
   document.getElementById("ShowFrameID").src = "https://www.youtube.com/embed/X9dSuFlRhJc" ;
  }
  else if(WhatToShow ==8) {
   document.getElementById("ShowFrameID").src = "https://www.youtube.com/embed/__DHLKlzFkg" ;
  }
  else if(WhatToShow ==9) {
   document.getElementById("ShowFrameID").src = "https://www.youtube.com/embed/xaez3mVBVMc" ;
  }
  else if(WhatToShow ==10) {
   document.getElementById("ShowFrameID").src = "https://www.youtube.com/embed/DqxdpP68b3k" ;
  }
}
