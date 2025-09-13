//Esercizio
//Milestone 1

//Come prima cosa, creiamo un controller per i nostri post, in una cartella controllers. 
//All’interno, prepariamo tutte le funzioni necessarie e copiamo in ciascuna la logica delle funzioni che attualmente si trovano nel router (al momento restituiscono solo dei messaggi). 
//Poi torniamo sul file delle rotte. Qui importiamo le funzioni dichiarate nel controller e le associamo alle varie rotte, come visto in classe.
//Testiamo su postman se chiamando gli endpoint riceviamo effettivamente le stesse risposte che avevamo prima. 
//Se tutto funziona, passiamo alla prossima milestone

//Milestone 2

//Per iniziare, creiamo una cartella data  in cui creare un file che contenga ed esporti l’array di posts che trovate in allegato.  Importiamo questo file in cima al controller. 
//Ora passiamo ad implementare le logiche delle nostre CRUD:
//Index dovrà restituire la lista dei post in formato JSON
//Show dovrà restituire un singolo post in formato JSON
//Destroy dovrà eliminare un singolo post dalla lista, stampare nel terminale (console.log) la lista aggiornata, e rispondere con uno stato 204 e nessun contenuto.

//Bonus
//Implementare un filtro di ricerca nella index che mostri solo i post che hanno un determinato Tag
//In Show e Destroy, controllare se il parametro si riferisce ad un post esistente, in caso contrario, rispondere con uno stato 404 e un messaggio d’errore, sempre in formato JSON.//


const express = require('express');
const app = express ();
const port = 3000;
const postRouter = require('./routers/post');
app.use(express.static('public'));
app.use(express.json());

app.listen(port, () => {
    console.log(`Server in ascolto sulla porta http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send('Benvenuto nella home page');
});

const post = [
    {
        id: 1,
        titolo: 'Il ciambellone',
            contenuto: 'Il ciambellone è un dolce tipico della tradizione italiana, amato per la sua semplicità e versatilità. Preparato con ingredienti base come farina, zucchero, uova e burro, il ciambellone può essere arricchito con aromi come vaniglia, limone o cacao. La sua caratteristica forma a ciambella lo rende perfetto per essere condiviso in famiglia o con gli amici durante la colazione o la merenda. La sua consistenza soffice e il sapore delicato lo rendono un dolce ideale per ogni occasione.', 
            immagine: 'imgs/ciambellone.jpeg',
            tags: ['introduzione', 'benvenuto']
    },
    {
        id: 2,
        titolo: 'Cracker alla barbabietola',
            contenuto: 'I cracker alla barbabietola sono uno snack salutare e gustoso, perfetto per chi cerca un\'alternativa leggera ai tradizionali cracker. Realizzati con farina integrale e polpa di barbabietola, questi cracker offrono un sapore unico e una consistenza croccante. La barbabietola non solo conferisce un colore vivace, ma aggiunge anche una dolcezza naturale e numerosi benefici nutrizionali, tra cui vitamine e antiossidanti. Ideali da gustare da soli o accompagnati da formaggi e salse, i cracker alla barbabietola sono una scelta eccellente per uno spuntino sano.', 
            immagine: 'imgs/cracker_barbabietola.jpeg',
            tags: ['salutare', 'snack']
    },
    {
        id: 3,
        titolo: 'Pane fritto dolce',
            contenuto: 'Il pane fritto dolce è una delizia irresistibile che combina la croccantezza del pane fritto con la dolcezza di zucchero e cannella. Questo piatto tradizionale, spesso preparato con fette di pane raffermo, viene immerso in una pastella leggera e poi fritto fino a ottenere una doratura perfetta. Una volta cotto, il pane viene spolverato con una miscela di zucchero e cannella, creando un contrasto di sapori che conquista il palato. Il pane fritto dolce è ideale per la colazione o come dessert, magari accompagnato da una tazza di cioccolata calda o un gelato alla vaniglia.', 
            immagine: 'imgs/pane_fritto_dolce.jpeg',
            tags: ['dolce', 'colazione']
    },
    {
        id: 4,
        titolo: 'Torta paesana',
            contenuto: 'La torta paesana è un dolce rustico e tradizionale, tipico delle zone rurali italiane. Caratterizzata da una base di pasta frolla croccante e un ripieno ricco di frutta secca, uvetta e spezie, questa torta offre un sapore autentico e avvolgente. La torta paesana viene spesso preparata in occasione di festività o celebrazioni familiari, rappresentando un legame con le radici culturali e culinarie del territorio. La sua consistenza morbida e il gusto intenso la rendono un dessert perfetto da gustare con una tazza di tè o caffè.', 
            immagine: 'imgs/torta_paesana.jpeg',
            tags: ['tradizionale', 'festa']
    }
];

app.get('/post', (req, res) => {
    res.json(post);
});

app.use('/api/post', postRouter);


app.get("/api/post", (req, res) => {
  let filtraPost = post;
  if (req.query.tags) {
    filtraPost = post.filter((postEl) => postEl.tags.includes(req.query.tags));
  }
  res.json(filtraPost);
});

app.get("api/post/:id", (req, res) => {
  const { id } = req.params;
  const postEl = post.find((singlePost) => singlePost.id === parseInt(id));
  if (!postEl) {
    return res.status(404).json({
      error: "not found",
      message: "resource not found",
    });
  }
  res.send(postEl);
});

app.post("/api/post", (req, res) => {
  res.send("Creazione di un nuovo post");
});

app.put("/api/post/:id", (req, res) => {
  res.send("Modificare il post con id:" + req.params.id);
});

app.patch("/api/post/:id", (req, res) => {
  res.send("Modificare in modo parziale il post con id:" + req.params.id);
});

app.delete("/api/post/:id", (req, res) => {
  const { id } = req.params;
  const postEl = post.find((singlePost) => singlePost.id === parseInt(id));
  if (!postEl) {
    return res.status(404).json({
      error: "Not found",
      message: "Resource not found",
    });
  }
  post.splice(post.indexOf(postEl), 1);
  res.sendStatus(204);
});
 