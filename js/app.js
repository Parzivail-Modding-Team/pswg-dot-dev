/**
 * Created by Colby on 2/14/2018.
 */
$(document).ready(function () {
	// fix menu when passed
	$('#mainmenu').visibility({
		once: false,
		onBottomPassed: function () {
			$('.fixed.menu').transition('fade in');
		},
		onBottomPassedReverse: function () {
			$('.fixed.menu').transition('fade out');
		}
	});

	// create sidebar and attach to menu open
	$('.ui.sidebar').sidebar('attach events', '.toc.item');
});
