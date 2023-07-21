import express from 'express';
import { applyMiddleware } from './config/middleware';
import routes from './routes';

const app = express();
applyMiddleware(app);
app.use(routes);

const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
