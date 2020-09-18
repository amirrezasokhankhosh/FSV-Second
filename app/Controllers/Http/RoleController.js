'use strict'

const Role = use('App/Models/Role')
const Permission = use('App/Models/Permission')

class RoleController {
    async create({ response }) {
        // ROLES
        var admin = new Role()
        admin.name = 'Admin'
        admin.slug = 'admin'
        admin.description = 'manage administration privileges'
        await admin.save()

        const customer = new Role()
        customer.name = 'Customer'
        customer.slug = 'customer'
        customer.description = 'manage customer privileges'
        await customer.save()

        // PERMISIONS

        const createCheckoutInfo = new Permission()
        createCheckoutInfo.slug = 'create_checkoutInfo'
        createCheckoutInfo.name = 'Create CheckoutInfo'
        createCheckoutInfo.description = 'Create CheckoutInfo permission'
        await createCheckoutInfo.save()

        // DEFINING PERMISIONS FOR ROLES
        
        await customer.permissions().attach([createCheckoutInfo.id])

        return response.send({ "message": "Roles Created succesfully" })
    }

    async admin({response , auth}){
        const user = await auth.getUser()
        var adminRole = await Role.query().where('name', 'Admin').fetch()
        adminRole = adminRole.toJSON()
        await user.roles().attach([adminRole[0].id])
        return response.send({"message" : "Admin role attached."})
    }
}

module.exports = RoleController
