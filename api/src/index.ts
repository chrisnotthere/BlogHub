import express from 'express';
import { applyMiddleware } from './config/middleware';
import routes from './routes';

const app = express();
applyMiddleware(app);
app.use(routes);

// Use Heroku's assigned port, or 5000 if running locally
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
