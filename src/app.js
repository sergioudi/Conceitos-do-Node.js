const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

//const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
    const {title,url,techs} = response.body;

    const repository = {
      id: uuid(),
      title,
      url,
      techs,
      like:0
    };
    repositories.push(repository);
    return response.json(repository);
});



app.put("/repositories/:id", (request, response) => {
    const {id} = request.params;
    const {title,url,techs} = response.body;    

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    if (repositoryIndex < 0) {
      return response.status(400).json({"error" : "Repository not found!"});
    };

    repository = repositories[repositoryIndex];
    repository.title = title;
    repository.url = url;
    repository.techs = techs;

    return response.json(repository)
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({"error" : "Repository not found!"});
  };

  repositories.slice(repositoryIndex,1);
  
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  const {like} = response.body;    

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({"error" : "Repository not found!"});
  };

  repository = repositories[repositoryIndex];
  repository.like += 1;
  
  return response.json(repository);     
});

module.exports = app;
