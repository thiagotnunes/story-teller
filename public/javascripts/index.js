$(document).ready(function() {
    $('#new-space').click(addStoryCard);

    function addStoryCard() {
        var story = $('<div>')
        .attr('id', 'story');

        var storyId = $('<div>')
        .attr('id', 'story-id')
        .attr('contenteditable', true)
        .text('#345');

        var storyTitle = $('<div>')
        .attr('id', 'story-title')
        .attr('contenteditable', true)
        .text('Story Title maiorzinha');

        var storyBody = $('<div>')
        .attr('id', 'story-body')
        .attr('contenteditable', true)
        .text('As a user I want to Then blah');

        console.log(story);

        story
        .append(storyId)
        .append(storyTitle)
        .append(storyBody)
        .appendTo($('#content'));
    }

    $('#new-space').click();
});
