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
    Story.find({ url: projectRegex(req.params.project) }, function (err, stories) {
      res.render('project', { project: stories[0].project, stories: stories, message: msg(err) });
    });
  });
  
  app.post('/:project', function (req, res) {
    Story.merge(req.body.story, function (err) {
      res.send({ url: sep+slug(req.body.story.project), message: msg(err, 'Story saved successfully') });
    });
  });
  
  app.get('/:project/:story', function(req, res) {
    Story.findOne({ url: sep+req.params.project+sep+req.params.story }, function (err, story) {
      story = story || { project: req.params.project, title: req.params.story };
      res.render('story', { story: story, message: msg(err) });
    });
  });
  
  app.put('/:project/:story', function(req, res) {
    Story.merge(req.body.story, function (err) {
      res.send({ url: sep+req.params.project, message: msg(err, 'Story updated successfully') });
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

function projectRegex(projectName) {
  return new RegExp('^/'+slug(projectName)+'/', 'i');
}

function msg(err, msg) {
  if (err) console.log(new Date(), err);
  return err ? 'Oops, something went wrong' : msg || '';
}