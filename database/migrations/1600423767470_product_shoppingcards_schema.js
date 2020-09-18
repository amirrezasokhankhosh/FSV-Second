'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductShoppingcardsSchema extends Schema {
  up () {
    this.create('product_shoppingcards', (table) => {
      table.increments()
      table.integer('product_id').unsigned().index()
      table.foreign('product_id').references('id').on('products').onDelete('cascade')
      table.integer('shoppingcard_id').unsigned().index()
      table.foreign('shoppingcard_id').references('id').on('shoppingcards').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('product_shoppingcards')
  }
}

module.exports = ProductShoppingcardsSchema
