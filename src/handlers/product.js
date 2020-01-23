const {
      Product
} = require('../models/mongoSchema')

exports.addProduct = async (request, h) => {
      try {
            const id = Math.floor(Math.random() * (10 ** 16))
            Object.assign(request.payload, { id: id })
            const newProduct = new Product(request.payload)
            await newProduct.save()
            return h.response('success')
      } catch (err) {
            return h.response('failed').code(401)
      }
}

exports.getProduct = async (request, h) => {
      try {

            // product = await Product.findOne({ title: title }, { 'title': 1 })
            // return h.response('success,by search')
            product = await Product.find()
            return product
      } catch (err) {
            return h.response('failed').code(401)
      }
}