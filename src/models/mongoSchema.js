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
      username: String,
      phone: String,
      first_name: String,
      last_name: String,
      address: String,
      reg_date: Date,
      active: Boolean,
      failedCount: Number,
      longLock: Date,
      balance: Number,
      userpin: Array,
      payeeList: [{
            username: String, add_date: { type: Date, default: Date.now }
      }]
})
const transactionSchema = new Schema({
      email: String,
      dateTransaction: Date,
      payee: String,
      usernamePayee: String,
      usernameSender: String,
      activity: Array,
      amount: Number,
      type: String,
      description: String,
      categories: String
})
const productSchema = new Schema({
      email: String,
      username: String,
      productName: String,
      productDesc : String,
      productPrice: String,


})
const User = mongoose.model('users', userSchema)
const Transaction = mongoose.model('transactions', transactionSchema)
const Product = mongoose.model('products', productSchema)
module.exports = { User, Transaction, Product }