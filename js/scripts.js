var BS = {
    anchorRe: /^\#\!\/(.*)$/,
    slides: undefined,
    selectedSlideIndex: 0,
    
    scrollToSection: function(target){
        var top = target.position().top;
        // Calculate the element centered within the viewport
        var height = target.outerHeight(true);
        var viewport = $(window).height();
        var position = (top - ((viewport - height) / 2));
        $('body').animate({
            scrollTop: position
        }, { queue: false });
        window.location.hash = ('!/' + target.attr('id'));
        console.log(BS.slides);
        BS.selectedSlideIndex = BS.slides.index(target);
    }
};

$(function(){
    BS.slides = $('header, #content > ol > li, footer');
    
    // Slide to the correct slide when the nav is clicked
    $('#navi a').click(function(e){
        e.preventDefault();
        var target = $($(this).attr('href'));
        BS.scrollToSection(target);
        return false;
    });
    
    // Tooltips for navigation items
    $('#navi a').tipsy({
        fade: true,
        gravity: 's',
        title: function(){
            return $(this).text();
        }
    });
    
    // Scroll to the right place on load if necessary
    if (window.location.hash.match(BS.anchorRe)) {
        BS.scrollToSection($('#' + RegExp.$1));
    }
    
    // Map left/right key presses to move between slides
    $(document).keydown(function(e){
        var arrow = { left: 37, right: 39 },
            target = BS.selectedSlideIndex;
        
        if (e.keyCode == arrow.left) {
            target--;
        } else if (e.keyCode == arrow.right) {
            target++;
        } else {
            return; // Nothing to do
        }
        
        // Clamp the index within bounds
        if (target < 0){
            target = (BS.slides.length - 1);
        } else if (target > (BS.slides.length - 1)) {
            target = 0;
        }
        
        target = BS.slides.eq(target);
        BS.scrollToSection(target);
    });
});
