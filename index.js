const express    = require('express');
const mongoose   = require('mongoose');
const helmet     = require('helmet');
const bodyParser = require('body-parser');
const morgan     = require('morgan');
const bluebird   = require('bluebird');
const swaggerUi  = require('swagger-ui-express');
const jsyaml     = require('js-yaml');

const config = require('./config');
const routes = require('./routes');
const swaggerSpec = require('fs').readFileSync('./swagger.yml', 'utf-8');
const swaggerDoc = jsyaml.safeLoad(swaggerSpec);

const app  = express();

mongoose.Promise = bluebird;
mongoose.connect(config.mongo.url);

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  if ('OPTIONS' == req.method){
    return res.send(200);
  }
  next();
});

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/', routes);

app.listen(config.server.port, () => {
  console.log(`Magic happens on port ${config.server.port}`);
});

module.exports = app;
