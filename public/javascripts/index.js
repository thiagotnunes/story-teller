$(document).ready(function() {
    $('#new-space').click(addStoryCard);

    function addStoryCard() {
        var card = storyCard('#', '')
        $('#black-box').show();
        card.html().css('z-index', 1).appendTo($('#content')).fadeIn('slow');
    }
    $('#new-space').click();
    $('#close-card').click(closeCard);

    function closeCard() {
        var blackBox = $('#black-box');
        if(blackBox.is(':visible'))
            blackBox.hide();
        $(this).parent().hide();
    }

});
