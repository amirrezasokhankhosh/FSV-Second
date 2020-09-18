'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductOrdersSchema extends Schema {
  up () {
    this.create('product_orders', (table) => {
      table.increments()
      table.integer('product_id').unsigned().index()
      table.foreign('product_id').references('id').on('products').onDelete('cascade')
      table.integer('order_id').unsigned().index()
      table.foreign('order_id').references('id').on('orders').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('product_orders')
  }
}

module.exports = ProductOrdersSchema
