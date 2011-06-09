function storyCard(id, title) {
    var self = {
        id: id,
        title: title,
        body: ''
    };

    self.html = function() {
        return createDivTo('story', false).css('display', 'none')
        .append(createDivTo('story-id').text(id))
        .append(createDivTo('story-title').text(title))
        .append(createDivTo('story-body'));
    };

    function createDivTo(class, editable) {
        var div = $('<div>')
        .attr('class', class)
        .attr('contenteditable', editable !== undefined ? editable : true);

        return div;
    }

    return self;
}
