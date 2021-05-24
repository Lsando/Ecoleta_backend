import express from 'express';
import routes from './routes';
import path from 'path';
import cors from 'cors';
import body_parser from 'body-parser'
const app = express();
app.use(body_parser.json());
app.use(routes);
app.use(cors());
app.use('/uploads', express.static(path.resolve(__dirname,'..','uploads')));
app.listen(3333);