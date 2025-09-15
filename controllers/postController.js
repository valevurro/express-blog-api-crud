const posts= require('../data/post')

//index 
const index= (req, res) => {

    res.json(posts)
}

//show
const show= (req, res) => {

  const { id } = req.params
  console.log(id);


  const post = posts.find(item => item.id === parseInt(id))
  console.log(post);
  
  if(!post) {

    res.status(404).json({
      error: true,
      message: 'Resource not found'
    })
  }

  res.json(post)

}

//store 
const store = (req, res) => {
  console.log(req.body);

  const newId = posts[posts.length - 1].id + 1;
  
  const { titolo, contenuto, immagine, tags } = req.body
  const newPost = {
    id: newId,
    titolo,
    contenuto,
    immagine,
    tags
  }

  console.log(newPost);
  
  posts.push(newPost)

  console.log(posts)
  
  res.status(201);
  res.json(newPost)
  
}

//update 
const update = (req, res) => {
  
  const id = parseInt(req.params.id)
  
  const post = posts.find(post => post.id == id);
  if (!post) {

    res.status(404);

    return res.json({

      error: "Non found",
      message:"Post not found"

    })

  }
 
  const { titolo, contenuto, immagine, tags } = req.body

  post.titolo = titolo;
  post.contenuto = contenuto;
  post.immagine = immagine;
  post.tags = tags;
  
  console.log(posts);
  
  res.json(posts);
  
}

//modify 
const modify= (req, res) => {
  res.send('Partial update for the single post with ID:' + req.params.id)
}

//destroy

const destroy= (req, res) => {
  const { id } = req.params
  console.log(id);


  const post = posts.find(item => item.id === parseInt(id))
  console.log(post);

  if (!post) {

    return res.status(404).json({
      error: true,
      message: 'Resource not found'
    })
  }

  posts.splice(posts.indexOf(post), 1);
  console.log(posts);

  res.sendStatus(204)
}

module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
}