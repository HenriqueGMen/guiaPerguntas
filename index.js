import express from "express";
import bodyParser from "body-parser";
import connection from "./database/db.js";
import Pergunta from "./database/Perguntas.js";
import Resposta from "./database/Resposta.js";

const app = express();  

connection
  .authenticate()
  .then(() => {
    console.log('Conexão estabelecida');
  })
  .catch((err) => console.log(err));
  
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req,res) => {
  Pergunta.findAll({ raw: true, order:[
    ['updatedAt', 'DESC']
  ]}).then(perguntas => {
    res.render("index", {
      perguntas
    });
  });
});

app.get("/perguntas", (req,res) => {
  res.render("paginaPerguntas");
});

app.get("/perguntas/:id", (req,res) => {
  const {id} = req.params;

  Pergunta.findOne({
    where: {id}
  }).then(pergunta => {
    if(pergunta != undefined){

      Resposta.findAll({
        where: {perguntaId: pergunta.id},
        order: [ ['id', 'DESC'] ]
      }).then(respostas => {
                res.render("pergunta", {
                  pergunta,
                  respostas
              });
      });
    } else{
      res.redirect("/");
    }
  });
});

app.post("/salvarpergunta", (req,res) => {
  const {titulo, descricao} = req.body;

  Pergunta.create({
    titulo,
    descricao
  }).then(() => {
    res.redirect("/");
  });
});

app.post("/responder", (req,res) => {
  const {corpo, perguntaId} = req.body;

  Resposta.create({
    corpo,
    perguntaId
  }).then(() => {
    res.redirect("/perguntas/"+perguntaId);
  });
})

app.listen(8080, console.log("Servidor Ativo!"));