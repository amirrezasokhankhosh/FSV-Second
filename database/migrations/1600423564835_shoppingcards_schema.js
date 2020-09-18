'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ShoppingcardsSchema extends Schema {
  up () {
    this.table('shoppingcards', (table) => {
      table.integer('order_id').unsigned().index()
      table.foreign('order_id').references('id').on('orders').onDelete('cascade')
    })
  }

  down () {
    this.table('shoppingcards', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ShoppingcardsSchema
