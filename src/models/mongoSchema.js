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
      cart: Array
})

const productSchema = new Schema({
      id: Number,
      title: String,
      description: String,
      price: Number,
      stock: Number,
      seller: String,
      created_at: {type: Date, default: Date.now},
      picture: String,
      category: String
})

const User = mongoose.model('users', userSchema)
const Product = mongoose.model('products', productSchema)

module.exports = { User,Product }