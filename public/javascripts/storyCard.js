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

    function button(className, id, text, action) {
        return createDivTo(className).attr('id', id).text(text).click(action);
    };

    function createDivTo(className, editable) {
        var div = $('<div>')
        .attr('class', className)
        .attr('contenteditable', editable !== undefined ? editable : true);

        return div;
    };

    return self;
}
