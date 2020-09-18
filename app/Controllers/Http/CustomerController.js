'use strict'

const { validate } = use('Validator')

const Customer = use('App/Models/Customer')
const Role = use('App/Models/Role')

class CustomerController {

    async create({request , response , auth}){
        const { city } = request.all()
        var customer = new Customer()
        var user = await auth.getUser()
        customer.user_id = user.id
        customer.city_id = city
        await customer.save()
        var customerRole = await Role.query().where('name', 'Customer').fetch()
        customerRole = customerRole.toJSON()
        await user.roles().attach([customerRole[0].id])
        return response.send({"message" : "Customer created succesfully."})
    }
}

module.exports = CustomerController
