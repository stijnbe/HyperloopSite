var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pairSchema = new Schema({
  startCity: String,
  endCity: String,
  routes: [{id: String}]
}); 

module.exports = mongoose.model('Todo', TodoSchema);
