$(function () {

  var dom = {
    listing: true
   ,projectLink: $('#projectLink')
   ,projectName: $('#projectName')
   ,projectNextStep: $('#projectNextStep')
   ,shown: $('#projectList')
   ,hidden: $('#projectForm')
   ,label: function(listing) { return listing ? 'Add' : 'List' }
  };
  
  dom.projectLink.click(function () {
    dom.shown.hide(function () {
      dom.hidden.show(function () {
        var _hidden = dom.shown;
        dom.shown = dom.hidden;
        dom.hidden = _hidden;
        dom.listing = !dom.listing;
        dom.projectLink.text(dom.label(dom.listing));
      });
    });
  });
  
  dom.projectNextStep.click(function () {
    document.location.href = dom.projectName.val().replace(/[^\w\s-]/g, '')+'/New Story';
  });

});