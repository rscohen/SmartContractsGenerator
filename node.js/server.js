import express from 'express'
const bodyParser = require('body-parser');
const app = express()

import DeploymentController from "./controllers/DeploymentController";
import GenerationController from "./controllers/GenerationController";
import HomeController from "./controllers/HomeController";

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', HomeController.getIndex);
app.get('/generation', GenerationController.getPage);
app.post('/generation', GenerationController.postGeneratedSC);
app.post('/deployment', DeploymentController.getPage);
app.post('/deployment/deploy', DeploymentController.deploy);

app.listen(process.env.PORT || 5000, function () {
  console.log('Example app listening on port 5000!')
})
