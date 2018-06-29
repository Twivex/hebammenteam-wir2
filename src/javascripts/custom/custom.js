$(document).ready(function () {
	
	var $well = $('.well'),
		$insideLink = $('a', $well);
		
	if ($insideLink.length) {
		$well.css('cursor','pointer');
		$('.well').click(function() {
			window.open($insideLink.attr('href'));
		});
	}
});