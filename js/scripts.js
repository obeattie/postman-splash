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
        $('html, body').animate({
            scrollTop: position
        }, { queue: false });
        window.location.hash = ('!/' + target.attr('id'));
        BS.selectedSlideIndex = BS.slides.index(target);
    }
};

$(function(){
    BS.slides = $('header, #content > ol > li, footer');
    
    // Slide to the correct slide when the nav is clicked
    $('#navi a, a#ding').click(function(e){
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
            target = BS.selectedSlideIndex,
            key = (e.keyCode || e.which);
        
        if (key == arrow.left) {
            target--;
        } else if (key == arrow.right) {
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
    
    // A click on something that isn't a link (that bubbles up to the
    // document level) results in showing the next slide
    $(document.body).click(function(e){
        if (!$(e.target).closest('a').length) {
            // Achieve this by simulating a right keypress
            $(document).trigger({
                type: 'keydown',
                keyCode: 39
            });
        }
    });
    
    // Previous/next arrow behaviours
    $('a#prev-arrow').click(function(e){
        $(document).trigger({
            type: 'keydown',
            keyCode: 37
        });
        return false;
    });
    $('a#next-arrow').click(function(e){
        $(document).trigger({
            type: 'keydown',
            keyCode: 39
        });
        return false;
    });
    
    // Hide the 'download chrome' button if they already have it
    if (/chrom(e|ium)/.test(navigator.userAgent.toLowerCase())){
        $('#download-chrome').hide();
    }
});
