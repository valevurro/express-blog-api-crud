const post = require("../data/postData");

const index = (req, res) => {
  //res.json(post);
  //console.log(req.query.tags);
  let filtraPost = post;
  if (req.query.tags) {
    filtraPost = post.filter((postEl) => postEl.tags.includes(req.query.tags));
  }
  res.json(filtraPost);
};

const show = (req, res) => {
  const { id } = req.params;
  const postEl = post.find((singlePost) => singlePost.id === parseInt(id));
  if (!postEl) {
    return res.status(404).json({
      error: "not found",
      message: "resource not found",
    });
  }
  res.send(postEl);
};

const store = (req, res) => {
  res.send("Crea un nuovo post");
};

const update = (req, res) => {
  res.send("Modifica il post con id:" + req.params.id);
};

const modify = (req, res) => {
  res.send("Modifica parzialmente il post con id:" + req.params.id);
};

const destroy = (req, res) => {
  const { id } = req.params;
  const postEl = post.find((singlePost) => singlePost.id === parseInt(id));
  if (!postEl) {
    return res.status(404).json({
      error: "not found",
      message: "resource not found",
    });
  }
  post.splice(post.indexOf(postEl), 1);
  res.sendStatus(204);
};

module.exports = { index, show, store, update, modify, destroy };