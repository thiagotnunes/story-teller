$(document).ready(function() {
    var blackBox = $('#black-box');
    var card = storyCard('#', 'blahhhh').html().css('z-index', 1).appendTo($('#content'));

    $('#new-space').click(showStoryCard);

    function showStoryCard() {
        blackBox.show();
        card.fadeIn('slow');
    }

    $('#new-space').click();
});
