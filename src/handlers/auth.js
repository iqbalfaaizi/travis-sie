const {
      User
} = require('../models/mongoSchema')
const {
      checkEmail,
      checkUsername
} = require('../validations/checker')

exports.signup = async (request, h) => {
      if ((await checkEmail(request.payload.email)) === null) {
            try {
                  const id = Math.floor(Math.random() * (10 ** 16))
                  const currTime = Date.now();
                  Object.assign(request.payload, {
                        id: id,
                        createdAt: currTime,
                  })
                  const newUser = new User(request.payload)
                  await newUser.save()
                  return h.response('Signup success')
            } catch (err) {
                  return h.response('Signup failed').code(401)
            }

      } else {
            return h.response('Email already used').code(403)
      }
}


exports.login = async (request, h) => {
      try {
            const email = request.payload.email;
            const password = request.payload.password;
            const userData = await User.findOne({
                  email: email
            }).lean();
            if (userData !== null) {
                  if (password === userData.password) {
                        const result = await User.findOneAndUpdate({
                              email: email
                        },{
                              new: true
                        }).lean();
                        return h.response('Login success').code(200)
                  } else {
                        return h.response('Your password is wrong').code(401)
                  }
            } else if (userData === null) {
                  return h.response('Email not registered').code(404)
            }
      } catch (err) {
            return h.response('Uncaught error').code(400)
      }
}

exports.setpin = async (request, h) => {
      try {
            const result = await User.findOneAndUpdate({
                  email: request.payload.email
            }, {
                  pinUser: request.payload.pinUser
            }, {
                  new: true
            })
            return result
      } catch (err) {
            return h.response(
                  [{
                        auth: false,
                        message: err
                  }]
            )
      }
}