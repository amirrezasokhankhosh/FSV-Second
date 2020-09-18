'use strict'

const { validate } = use('Validator')

const Product = use('App/Models/Product')
const Product_Category = use('App/Models/ProductCategory')
class ProductController {

    async create({ request, response, auth }) {
        const validation = await validate(request.all(), {
            name: 'required'
        })
        if (!validation.fails()) {
            const { name, categories, price } = request.all()
            const user = await auth.getUser()
            var product = new Product()
            product.name = name
            product.user_id = user.id
            product.price = price
            await product.save()
            var i = 0
            while (categories[i]) {
                var product_Category = new Product_Category()
                product_Category.category_id = categories[i]
                product_Category.product_id = product.id
                await product_Category.save()
                i = i + 1
            }

            return response.send({ "message": "Product created succesfully." })
        } else {
            return response.send({ "message": "name is required" })
        }
    }

    async show({ request, response }) {
        const { most_expensive , least_expensive , latest} = request.all()
        if (latest){
            var products = await Product.query().with('comments').with('categories').orderBy('created_at' , 'desc').fetch()
            return response.send(products.toJSON())
        } else if (most_expensive){
            var products = await Product.query().with('comments').with('categories').orderBy('price' , 'desc').fetch()
            return response.send(products.toJSON())
        } else if (least_expensive){
            var products = await Product.query().with('comments').with('categories').orderBy('price' , 'asc').fetch()
            return response.send(products.toJSON())
        } else {
            var products = await Product.query().with('comments').with('categories').fetch()
            return response.send(products.toJSON())
        }
    }
}

module.exports = ProductController
