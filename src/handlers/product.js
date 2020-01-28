const {
      Product, User
} = require('../models/mongoSchema')
const path = require('path')
const fs = require('fs')

exports.addProduct = async (request, h) => {
      try {
            let id = Math.floor(Math.random() * (10 ** 16))
            let extension = path.extname(request.payload.picture.hapi.filename)
            let timestamp = new Date().getTime();
            let fileName = email + '-' + timestamp + extension;
            (request.payload.picture).pipe(fs.createWriteStream(__dirname + '/src/img/' + fileName))
            Object.assign(request.payload, { id: id, picture: fileName })
            console.log(request.payload)
            const newProduct = new Product(request.payload)
            await newProduct.save()
            // await Product.insertMany([{
            //       id:id,
            //       email: 
            // }])
            return h.response('success')
      } catch (err) {
            return h.response('failed').code(401)
      }
}

exports.getProduct = async (request, h) => {
      try {
            product = await Product.find()
            return product
      } catch (err) {
            return h.response('failed').code(401)
      }
}

exports.addCart = async (request, h) => {
      const { email } = request.params
      const { payload } = request
      return User.findOneAndUpdate({ 'email': email }, { $push: { cart: { 'title': payload.title, 'description': payload.description, 'stock': payload.stock, 'price': payload.price, 'seller': payload.seller } } }, { new: true })
            .then(res => {
                  if (!res) {
                        return h.response({ message: "Email not found" })
                  }
                  return h.response(res).code(202)
            })
}

exports.getCart = async (request, h) => {
      const { email } = request.params
      const user = await User.findOne({ email: email }, { 'cart': 1 })
      return user.cart
}
