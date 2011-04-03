    // Scrolling Navigation

	var name = "#navi > ol";
	var menuYloc = null;

		$(document).ready(function(){
			menuYloc = parseInt($(name).css("bottom").substring(0,$(name).css("bottom").indexOf("px")))
			$(window).scroll(function () { 
				offset = "-" + $(document).scrollTop()+"px";
				$(name).animate({bottom: offset},{duration:300,queue:false});
			});
		});

$(function() {
    
    //Scrolling Funcations
    
	$('#ding').click(function(){
		$('html, body').animate({scrollTop:1270}, 'slow');
		return false;
	});
	
	$('#away').click(function(){
		$('html, body').animate({scrollTop:1270}, 'slow');
		return false;
	});
	
	$('#all').click(function(){
		$('html, body').animate({scrollTop:2470}, 'slow');
		return false;
	});
	
	$('#throw').click(function(){
		$('html, body').animate({scrollTop:2470}, 'slow');
		return false;
	});
	
	$('#person').click(function(){
		$('html, body').animate({scrollTop:3690}, 'slow');
		return false;
	});
	
	$('#friends').click(function(){
		$('html, body').animate({scrollTop:3690}, 'slow');
		return false;
	});
	
	$('#it').click(function(){
		$('html, body').animate({scrollTop:5050}, 'slow');
		return false;
	});
	
	$('#inbox').click(function(){
		$('html, body').animate({scrollTop:5050}, 'slow');
		return false;
	});
	
	$('#us').click(function(){
		$('html, body').animate({scrollTop:6500}, 'slow');
		return false;
	});
	
});


