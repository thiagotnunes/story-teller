function storyCard(id, title) {
    var self = {
        id: id,
        title: title,
        body: ''
    };

    var saveButton = button('action-button', 'save-card', 'Save', saveAction);
    var closeButton = button('action-button', 'close-card', 'Close', closeAction); 
    
    var html = function() {
        return createDivTo('story', false).css('display', 'none')
        .append(createDivTo('story-id').text(id))
        .append(createDivTo('story-title').text(title))
        .append(createDivTo('story-body'))                           
        .append(saveButton)
        .append(closeButton);
    }();                                                                         

    self.html = function() {
        return html;
    };

    function saveAction() {
        console.log(self);
    };
    
    function closeAction() {
        var blackBox = $('#black-box');
        if(blackBox.is(':visible'))
            blackBox.hide();
        html.hide();
    };

    function button(class, id, text, action) {
        return createDivTo(class).attr('id', id).text(text).click(action);
    };

    function createDivTo(class, editable) {
        var div = $('<div>')
        .attr('class', class)
        .attr('contenteditable', editable !== undefined ? editable : true);

        return div;
    };

    return self;
}
