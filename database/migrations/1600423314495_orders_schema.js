'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrdersSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table.integer('customer_id').unsigned().index()
      table.foreign('customer_id').references('id').on('customers').onDelete('cascade')
      table.integer('checkoutinfo_id').unsigned().index()
      table.foreign('checkoutinfo_id').references('id').on('checkoutinfos').onDelete('cascade')
      table.integer('shoppingcard_id').unsigned().index()
      table.foreign('shoppingcard_id').references('id').on('shoppingcards').onDelete('cascade')
      table.boolean('sending').defaultTo(false)
      table.boolean('received').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrdersSchema
