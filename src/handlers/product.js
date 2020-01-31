const {
      Product, User
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
            product = await Product.find()
            return product
      } catch (err) {
            return h.response('failed').code(401)
      }
}

exports.addCart = async (request, h) => {
      const { email } = request.params
      const { payload } = request
      return User.findOneAndUpdate({ 'email': email }, { $push: { cart: { 'title': payload.title, 'description': payload.description, 'stock': parseInt(payload.stock), 'price': parseInt(payload.price), 'seller': payload.seller,'picture': payload.picture } } }, { new: true })
            .then(res => {
                  if (!res) {
                        return h.response({ message: "Email not found" })
                  }
                  return h.response('success').code(202)
            })
}

exports.getCart = async (request, h) => {
      const { email } = request.params
      const user = await User.findOne({ email: email }, { 'cart': 1 })
      let grandtot = 0;
      for(i=0; i<user.cart.length; i++) {
            let total = user.cart[i].stock * user.cart[i].price;
            grandtot += total
            let productTotal = {
                  'total' : total,
                  'grandtotal' : grandtot
            }
            Object.assign(user.cart[i], productTotal);
      }
      // console.log(JSON.stringify(user.cart));
      return user.cart
}

exports.removeCart = async (request, h) => {
      const { email } = request.params
      const { payload } = request
      return User.findOneAndUpdate({ 'email': email }, { $pull: { cart: { 'title': payload.title, 'description': payload.description, 'stock': parseInt(payload.stock), 'price': parseInt(payload.price), 'seller': payload.seller, 'picture': payload.picture } } }, { new: true })
          .then(res => {
              if (!res) {
                  return h.response({ message: "Email not found" })
              }
              return h.response(res).code(202)
          })
  }
