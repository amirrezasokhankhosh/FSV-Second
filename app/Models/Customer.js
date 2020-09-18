'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Customer extends Model {
    checkoutinfos() {
        return this.hasMany('App/Models/Checkoutinfo')
    }

    shoppingcards() {
        return this.hasMany('App/Models/Shoppingcard')
    }

    orders() {
        return this.hasMany('App/Models/Order')
    }
}

module.exports = Customer
