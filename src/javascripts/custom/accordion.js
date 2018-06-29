$(document).ready(function () {
	var expanded = false;
	
	// init collapse all button
	$('button[data-type="collapseAll"]').click(function () {
		if (!expanded) {
			$('.collapse', $($(this).data('target'))).collapse('show');
			$('.text', $(this)).text('Alle schließen');
			$('.glyphicon', $(this)).removeClass('glyphicon-triangle-bottom').addClass('glyphicon-triangle-top');
			expanded = true;
		} else {
			$('.collapse', $($(this).data('target'))).collapse('hide');
			$('.text', $(this)).text('Alle öffnen');
			$('.glyphicon', $(this)).removeClass('glyphicon-triangle-top').addClass('glyphicon-triangle-bottom');
			expanded = false;
		}
	});
	
	// make hole panel heading clickable
	$('.panel-heading').click(function () {
		$(this).next('.collapse').collapse('toggle');
	});
});