'use strict'

const User = use('App/Models/User')

const { validate } = use('Validator')

class UserController {

    async register({ request, response }) {
        const validation = await validate(request.all(), {
            username: 'required|min:3',
            email: "required|email",
            password: "required|min:5"
        })
        if (!validation.fails()) {
            const { username, email, password } = request.all()
            var user = new User()
            user.username = username
            user.email = email
            user.password = password
            await user.save()
            response.send({ "message": "The user created succesfully." })

        } else {
            response.send({ "error": "true" })
        }
    }

    async login({ request, response, auth }) {
        const { email, password } = request.all()
        try {
            const token = await auth.attempt(email, password)
            return response.send(token)
        } catch {
            return response.send({ "error": "true" })
        }
    }

}

module.exports = UserController
