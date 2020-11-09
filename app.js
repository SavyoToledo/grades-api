import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { db } from './models/index.js';
import gradeController from './controllers/gradeController.js';

const { create, findAll, findOne, update, remove, removeAll } = gradeController;

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    process.exit();
  }
})();

const app = express();

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('API em execucao');
});

app.post('/grade', create);
app.get('/grade', findAll);
app.get('/grade/:id', findOne);
app.put('/grade/:id', update);
app.delete('/grade/:id', remove);
app.delete('/grade', removeAll);

app.listen(process.env.PORT || 8081, async () => {
  console.log('API iniciada');
});
