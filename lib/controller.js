var Story = require('./model').Story
  , slug = require('./slug')
  , sep = '/';

module.exports = function(app) {
  
  app.get('/', function (req, res) {
    Story.distinct('project', {}, function(err, projects) {
      res.render('index', { projects: wrap(projects), message: msg(err) });
    });
  });
  
  app.get('/:project', function (req, res) {
    Story.find({ url: new RegExp('^/'+req.params.project+'/', 'i') }, function (err, stories) {
      res.render('project', { project: stories[0].project, stories: stories, message: msg(err) });
    });
  });
  
  app.post('/:project', function (req, res) {
    Story.merge(req.body.story, function (err) {
      res.render('project', { stories: stories, message: msg(err, 'Story saved successfully') });
    });
  });
  
  app.get('/:project/:story', function(req, res) {
    var url = sep + req.params.project + sep + req.params.story;
    console.log(123,url)
    Story.findOne({ url: url }, function (err, story) {
      res.render('story', { story: story, message: msg(err) });
    });
  });
  
  app.put('/:project/:story', function(req, res) {
    Story.merge(req.body.story, function (mergeErr) {
      Story.find({ project: req.params.project }, function (findErr, stories) {
        var err = mergeErr || findErr;
        res.render('project', { stories: stories, message: msg(err, 'Story updated successfully') });
      });
    });
  });

};

function wrap(projects) {
  return projects.map(function(project) {
    return {
      url: slug(project)
     ,name: project
    };
  });
}

function msg(err, msg) {
  if (err) console.log(err);
  return err ? 'Oops, something went wrong' : msg;
}