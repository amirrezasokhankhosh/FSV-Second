'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
    comments() {
        return this.hasMany('App/Models/Comment')
    }

    categories() {
        return this.belongsToMany('App/Models/Category').pivotTable('product_categories')
    }

    orders() {
        return this.belongsToMany('App/Models/Order').pivotTable('product_orders')
    }

    shoppingcards() {
        return this.belongsToMany('App/Models/Shoppingcard').privotTable('product_shoppingcards')
    }
}

module.exports = Product
