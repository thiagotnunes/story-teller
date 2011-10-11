$(document).ready(function() {

    var storyTitle = $('#storyTitle').val()
      , card = storyCard('#', storyTitle).html().css('z-index', 1).appendTo($('#content'));

    $('#new-space').click(showStoryCard);

    function showStoryCard() {
        card.fadeIn('slow');
    }

    $('#new-space').click();
});

function storyCard(id, title) {
  var self = {
    id: id
   ,title: title
   ,body: ''
  };

  var saveOrUpdateAction = $('#storyUrl').val() ? updateAction : saveAction
    , saveButton = button('action-button', 'save-card', 'Save', saveOrUpdateAction)
    , closeButton = button('action-button', 'close-card', 'Close', closeAction); 
  
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
      project: $('#projectName').text().replace('/', '-')
     ,title: $('#content .story-title').text().replace('/', '-')
     ,description: $('#content .story-body').html()
     ,url: $('#storyUrl').val() || ''
    };
  }
  
  function saveAction() {
    var story = getStory()
      , url = '/'+story.project;
    $.post(url, { story: story }, redir);
  };
  
  function updateAction() {
    var story = getStory()
      , url = '/'+story.project+'/'+story.title;
    $.post(url, { story: story, _method: 'put' }, redir);
  }
  
  function redir(result) {
    $('#content').html($('<h3>').text(result.message));
    setTimeout(function () {
      document.location.href = result.url;
    }, 1234)
  }
  
  function closeAction() {
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