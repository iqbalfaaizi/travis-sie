const mongoose = require('mongoose')
// const mongoUrl = 'mongodb://localhost/imoniDB'
const mongoUrl = 'mongodb://skuisydb:admin12345@skuisy-shard-00-00-1b8mf.mongodb.net:27017,skuisy-shard-00-01-1b8mf.mongodb.net:27017,skuisy-shard-00-02-1b8mf.mongodb.net:27017/skuisyDB?ssl=true&replicaSet=Skuisy-shard-0&authSource=admin&retryWrites=true&w=majority'
const server = mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
})
if (server) { console.log("Connected to the server") }
mongoose.set('debug', true)
const Schema = mongoose.Schema
const userSchema = new Schema({
      id: Number,
      email: { type: String, unique: true },
      password: String,
      reg_date: {type: Date, default: Date.now},
      active: {type: Boolean, default: true},
})
const User = mongoose.model('users', userSchema)

module.exports = { User }