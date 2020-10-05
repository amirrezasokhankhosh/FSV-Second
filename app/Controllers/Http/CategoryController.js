'use strict'

const Category = use('App/Models/Category')

const { validate } = use('Validator')
class CategoryController {

    async create({ request , response }){
        const validation = await validate(request.all(), {
            name: 'required'
        })
        if (!validation.fails()) {
            const { name } = request.all()
            var category = new Category()
            category.name = name
            await category.save()
            return response.send({"message" : "Category created succesfully."})
        } else {
            return response.send({"message" : "name is required"})
        }
    }

    async show({response}){
        var categories = await Category.all()
        return response.send(categories)
    }
}

module.exports = CategoryController
