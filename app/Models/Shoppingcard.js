'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Shoppingcard extends Model {
    products() {
        return this.belongsToMany('App/Models/Product').pivotTable('product_shoppingcards')
    }
}

module.exports = Shoppingcard
