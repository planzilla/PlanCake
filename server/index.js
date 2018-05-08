const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./routes/routes.js');
const reactRoutes = require('./routes/reactRoutes.js');
const app = express();
const reactApp = express.static(path.join(__dirname, '/../client/dist'));
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);

reactRoutes.forEach(route => app.use(route, reactApp));

app.listen(PORT, () => { console.log(`listening to port ${PORT}!`); });

// if (PORT) {
//   let webpack = require('webpack');
//   let webpackMiddleware = require('webpack-dev-middleware');
//   let webpackHotMiddleware = require('webpack-hot-middleware');
//   let config = require('../webpack.config.js');

//   const compiler = webpack(config);
//   const middleware = webpackMiddleware(compiler, {
//     publicPath: config.output.publicPath,
//     noInfo: true,
//     quiet: false,
//     lazy: false,
//     watchOptions: {
//       aggregateTimeout: 300,
//       poll: true
//     },
//     stats: {
//       colors: true,
//     }
//   });
//   const bundlePath = path.join(__dirname, './public/build/index.html')

//   app.use(middleware);
//   app.use(webpackHotMiddleware(compiler));
//   app.get('*', function response(req, res) {
//     res.write(middleware.fileSystem.readFileSync(bundlePath));
//     res.end();
//   });
// } else {
//   app.use(express.static(__dirname + './public/build'));
//   app.get('*', function response(req, res) {
//     res.sendFile(path.join(__dirname, './public/build/index.html'));
//   });
// }



module.exports = app;
