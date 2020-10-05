'use strict'

const Order = use('App/Models/Order')
const Shoppingcard = use('App/Models/Shoppingcard')
const ProductOrder = use('App/Models/ProductOrder')
class OrderController {

    async create({request , response , auth}){
        const { checkoutinfo_id , shoppingcard_id } = request.all()
        var shoppingcard = await Shoppingcard.find(shoppingcard_id)
        var user = await auth.getUser()
        await user.load('customer')
        var order = new Order()
        order.checkoutinfo_id = checkoutinfo_id
        order.shoppingcard_id = shoppingcard_id
        order.customer_id = user.toJSON().customer.id
        console.log(user)
        await order.save()
        shoppingcard.order_id = order.id
        await shoppingcard.save()
        await shoppingcard.load('products')
        var products = shoppingcard.toJSON().products
        var i = 0 
        while(products[i]){
            var productOrder = new ProductOrder()
            productOrder.product_id = products[i].id
            productOrder.order_id = order.id
            await productOrder.save()
            i = i + 1
        }
        response.send({"message" : "Order created succesfully."})
    }
    
    async readAll({response , auth}){
        const user = await auth.getUser()
        await user.load('customer')
        const customer = user.toJSON().customer
        const orders = await Order.query().where('customer_id', customer.id).fetch()
        return response.send(orders)
    }

    async readyToSend({params , response}){
        var order = await Order.find(params.order_id)
        order.ready_to_sending = true
        await order.save()
        return response.send({"message" : "Order is ready to send to customer."})
    }

    async received({params , response}){
        var order = await Order.find(params.order_id)
        order.received_from_customer = true
        await order.save()
        return response.send({"message" : "The order received from the customer."})
    }
}

module.exports = OrderController
