const express = require('express');
const path = require('path');
// const bodyParser = require('body-parser');

const app = express();
app.use(express.static(path.join(__dirname, '/../client/dist')));
app.listen(3000, () => { console.log('listening on 3000!'); });
