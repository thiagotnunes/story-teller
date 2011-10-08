var mongoose = require('mongoose')
  , slug = require('./slug')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , sep = '/';

mongoose.connect('mongodb://story-teller:yosemiterules@staff.mongohq.com:10026/story-teller');

var Story = module.exports.Story = mongoose.model('story', new Schema({ _id: ObjectId

  , url         : { type: String, unique: true }
  , project     : { type: String, index: true, required: true }
  , title       : { type: String, index: true, required: true }
  , description : { type: String, index: true }
  , date        : { type: Date, default: Date.now }

}).pre('save', function (next) {
  this.url = sep + slug(this.project) + sep + slug(this.title);
  next();
}));

Story.merge = function(story, callback) {
  if (story.url) {
    var query = { url: story.url };
    update(query, story, callback);
    return;
  }
  new Story(story).save(callback);
};

function update(query, story, callback) {
  Story.findOne(query, function (err, found) {
    if (got(err, callback)) return;
    if (not(found, callback)) return;
    copy(story, found);
    found.save(callback);
  });
}

function got(err, callback) {
  if (err) callback(err);
  return err ? true : false;
}

function not(found, callback) {
  if (!found) callback(new Error('MERGE FAILED: Story not found by url'));
  return found ? false : true;
}

function copy(from, to) {
  for (key in from) {
    if (key !== '_id') {
      to[key] = from[key];
    }
  }
}

/*
Story.merge(story, function callback (err) {});
Story.find(query, function callback (err, stories) {});
Story.remove(query, function callback (err) {});
*/