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
                  const id = Math.floor(Math.random() * (10 **16))
                  Object.assign(request.payload, {id: id})
                  const newUser = new User(request.payload)
                  await newUser.save()
                  return h.response('success')
            } catch (err) {
                  return h.response('failed').code(401)
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
                        return h.response('success')
                  } else {
                        return h.response('Your password is wrong').code(401)
                  }
            } else if (userData === null) {
                  return h.response('Email not registered').code(404)
            }
      } catch (err) {
            return h.response('failed').code(400)
      }
}
