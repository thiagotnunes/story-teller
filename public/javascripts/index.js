$(document).ready(function() {
    $('#new-space').click(addStoryCard);

    function addStoryCard() {
        var card = storyCard('#', '')
        
        card.html().appendTo($('#content')).fadeIn('slow');
    }

    $('#new-space').click();
});
