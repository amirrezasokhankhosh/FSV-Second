'use strict'

const Shoppingcard = use('App/Models/Shoppingcard')
const ProductShoppingcard = use('App/Models/ProductShoppingcard')
const Order = use('App/Models/Order')
const ProductOrder = use('App/Models/ProductOrder')

class ShoppingcardController {

    async create({ response, auth }) {
        var user = await auth.getUser()
        await user.load('customer')
        console.log(user)
        var shoppingcard = new Shoppingcard()
        shoppingcard.customer_id = user.toJSON().customer.id
        await shoppingcard.save()
        return response.send({ "message": "Shopping card created succesfully." })
    }

    async update({ request, response, params }) {
        const shoppingcard = await Shoppingcard.find(params.shoppingcard_id)
        if (shoppingcard.order_id) {
            const order = await Order.find(shoppingcard.order_id)
            if (order.sending) {
                return response.send({ "message": "You cannot add a product to a shopping card that is belongs to a order that is ready to send." })
            }
        }
        const { products } = request.all()
        var i = 0
        while (products[i]) {
            var productShoppingcard = new ProductShoppingcard()
            productShoppingcard.product_id = products[i]
            productShoppingcard.shoppingcard_id = params.shoppingcard_id
            await productShoppingcard.save()
            var productOrder = new ProductOrder()
            productOrder.product_id = products[i]
            productOrder.order_id = shoppingcard.order_id
            await productOrder.save()
            i = i + 1
        }
        return response.send({ "message": "Shopping card updated with the following products." })
    }

    async read({ response, auth }) {
        const user = await auth.getUser()
        await user.load('customer')
        const customer = user.toJSON().customer
        const shoppingcards = await Shoppingcard.findBy('customer_id', customer.id)
        return response.send(shoppingcards)
    }
}

module.exports = ShoppingcardController
