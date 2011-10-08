var mongoose = require('mongoose')
  , slug = require('./slug')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , sep = '/';

mongoose.connect('mongodb://story-teller:yosemiterules@staff.mongohq.com:10026/story-teller');

var Story = module.exports.Story = mongoose.model('story', new Schema({ _id: ObjectId

  , url         : { type: String, unique: true }
  , project     : { type: String, required: true }
  , title       : { type: String, required: true }
  , description : { type: String }
  , date        : { type: Date, default: Date.now }

}).pre('save', function (next) {
  this.url = slug(this.project) + sep + slug(this.title);
  next();
}));

/*
aStoryInstance.save(function (err) {});
Story.find({}, function (err, stories) {});
Story.remove({}, function (err) {});

Story.findOne({obj:'query'}, function(err, story) {
  //story.makeChanges...
  story.save(function(err) {
    //err.should.be.null
  });
});
*/