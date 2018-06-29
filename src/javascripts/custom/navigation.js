/*$(document).ready(function () {
	var $top = $('[href="#top"]'),
		$topNav = $('.navbar-fixed-top'),
		gapNavBody = 20,
		$activeLink = $('#menu > ul > li > a[href="' + window.location.hash + '"]');
	
	// click handler for back-to-top
	$top.click(function (e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		}, 500);
	});
	
	// clear order of fixed nav and content (+ gap)
	if ($topNav.length) {
		$('body').css('margin-top',$topNav.height() + gapNavBody);
	}
	
	// init smoothscroll for navigation
	$('#menu > ul > li > a').click(function (event) {
		event.preventDefault();
		$('html, body').animate({
			scrollTop: $($(this).attr('href')).offset().top - 70
		}, 500);
	});
	
	// init scrollspy
	$spy = $('body').scrollspy({
		target: '#menu',
		offset: 120
	});
	
	// change displayed url
	$spy.on('activate.bs.scrollspy', function (event, context) {
		// handle history api
		var $a, url, title;
		if (context !== undefined) {
			$a = $(context);
		}
		else {
			$a = $('.active > a', event.target);
			if ($a.length === 0) {
				$a = $('a', event.target);
			}
		}
		url = $a.data('url');
		title = $a.text();
			
		if (url !== undefined) {
			history.replaceState(null, title, url);
		}
	});
	
	// handle hashes on page load
	history.replaceState(null, $activeLink.text(), $activeLink.data('url'));
	
});*/