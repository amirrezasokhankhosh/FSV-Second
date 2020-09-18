'use strict'

const { validate } = use('Validator')

const Checkoutinfo = use('App/Models/Checkoutinfo')
const Order = use('App/Models/Order')

class CheckoutinfoController {

    async create({ request, response, auth }) {
        const validation = await validate(request.all(), {
            address: 'required',
            phone: 'required'
        })

        if (!validation.fails()) {
            const { address, phone } = request.all()
            const user = await auth.getUser()
            await user.load('customer')
            var checkoutinfo = new Checkoutinfo()
            console.log(checkoutinfo)
            checkoutinfo.address = address
            checkoutinfo.phone = phone
            checkoutinfo.customer_id = user.toJSON().customer.id
            
            await checkoutinfo.save()
            return response.send({ "message": "Checkout info created succesfully." })
        } else {
            return response.send({ "message": "Phone and address are required." })
        }
    }

    async delete({params , response}){
        var orders = await Order.query().where('checkoutinfo_id' , params.checkoutinfo_id).fetch()
        var i = 0 
        orders = orders.toJSON()
        while(orders[i]){
            if(orders[i].sending && !orders[i].received){
                return response.send({"message" : "You cannot delete a checkout info when it is sending to the customer."})
            }
        }
        var checkoutinfo = await Checkoutinfo.find(params.checkoutinfo_id)
        await checkoutinfo.delete()
        return response.send({"message" : "Checkout info deleted succesfully."})
    }
}

module.exports = CheckoutinfoController
