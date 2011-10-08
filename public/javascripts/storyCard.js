$(document).ready(function() {
    var blackBox = $('#black-box');
    var storyTitle = $('#storyTitle').val();
    var card = storyCard('#', storyTitle).html().css('z-index', 1).appendTo($('#content'));

    $('#new-space').click(showStoryCard);

    function showStoryCard() {
        blackBox.show();
        card.fadeIn('slow');
    }

    $('#new-space').click();
});

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

  function getStory() {
    return {
      project: $('#projectName').text()
     ,title: $('#content .story-title').text()
     ,description: $('#content .story-body').html()
    };
  }
  
  function updateAction() {
    $.post('/project/story', { story: getStory(), _method: 'put' }, function(result) {
      console.log(result);
    });
  }
  
  function saveAction() {
    $.post('/project', { story: getStory() }, function(result) {
      console.log(result);
    });
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