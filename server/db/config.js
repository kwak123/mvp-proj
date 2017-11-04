var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:pass@ds149335.mlab.com:49335/highscores');
var db = mongoose.connection;
db.on('error', (err) => console.log('error'));
db.once('open', () => console.log('running')); 