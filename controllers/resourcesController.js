const Resource = require("../models/resource");
const Topic = require("../models/topic");

module.exports = {
  findAllResources: (req, res) => {
    Resource.find({ topic: req.params.id }).then((doc) => {
      res.send(doc);
    });
  },

  createNewResource: (req, res) => {
    let resource = new Resource();

    let newResource = {
      title: req.body.title,
      description: req.body.description,
      url: req.body.url,
      topic: req.body.topic,
      completed: req.body.completed,
    };

    const { title, description, url, topic, completed } = req.body;

    resource["title"] = title;
    resource["description"] = description;
    resource["url"] = url;
    resource["completed"] = completed;
    resource["topic"] = topic;

    resource.save().then((doc) => {
      Topic.findOne({ _id: topic }).then((topic) => {
        topic.resources.push(doc);
        topic.save();
      });
    });

    Resource.create(newResource)
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(422).json(err));
  },

  findResourceById: (req, res) => {
    Resource.findOne({ _id: req.params.id });
  },

  updateResource: (req, res) => {
    Resource.findOneAndUpdate(
      { _id: req.body.id },
      { completed: req.body.completed }
    ).then((doc) => res.send(doc));
  },

  removeResource: function (req, res) {
    Resource.findByIdAndRemove({ _id: req.body.resource }).then((doc) =>
      Topic.findOne({ _id: req.body.topic }).then((res) => {
        console.log(res);
        res.resources.filter((item) => item._id !== doc._id);
        res.save();
      })
    );
  },
};

// {
//   "resource": "5ef266589a6d50439471f794",
//   "topic": "5ef25a7b75255855680e0fd8"
// }
