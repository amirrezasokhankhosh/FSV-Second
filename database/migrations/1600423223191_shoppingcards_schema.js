'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ShoppingcardsSchema extends Schema {
  up () {
    this.create('shoppingcards', (table) => {
      table.increments()
      table.integer('customer_id').unsigned().index()
      table.foreign('customer_id').references('id').on('customers').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('shoppingcards')
  }
}

module.exports = ShoppingcardsSchema
