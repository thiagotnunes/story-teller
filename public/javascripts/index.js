$(document).ready(function() {
    var blackBox = $('#black-box');
    var card = storyCard('#', 'blahhhh').html().css('z-index', 1).appendTo($('#content'));
    $('#close-card').click(closeCard);

    $('#new-space').click(showStoryCard);

    function showStoryCard() {
        blackBox.show();
        card.fadeIn('slow');
    }

    $('#new-space').click();
    
    function closeCard() {
        if(blackBox.is(':visible'))
            blackBox.hide();
        $(this).parent().hide();
    }

});
