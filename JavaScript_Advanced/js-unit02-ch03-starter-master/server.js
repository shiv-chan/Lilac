const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);
const express = require('express');
const cors = require('cors')

const app = express();

// const corsOptions = {
//   origin: 'http://localhost:8080',
//   optionsSuccessStatus: 200
// }

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(require("webpack-dev-middleware")(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler));

app.get('/', (req, res) => {
  res.status(200).send({
    success: true
  });
})

app.get('/properties/:id', (req, res) => {
  const propertyId = parseInt(req.params.id);
  const propertyData = {
    id: 1,
    propertyName: '1BR Japanese-style Private Room near Kyoto Station',
    propertyType: 'private',
    cancelPolicy: 'strict',
    roomNum: 1,
    bathroomNum: 1,
    priceInDollars: 50,
    host: {
      id: 1,
      firstName: 'Tom'
    }
  }
  if (propertyId === 1) {
    res.status(200).send({
      propertyData
    });
  } else {
    res.status(403).send({
      message: "Property not found."
    });
  }
});

app.listen(3000, () => console.log('listening on port 3000!'));