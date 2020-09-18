'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CheckoutinfosSchema extends Schema {
  up () {
    this.create('checkoutinfos', (table) => {
      table.increments()
      table.integer('customer_id').unsigned().index()
      table.foreign('customer_id').references('id').on('customers').onDelete('cascade')
      table.string('address')
      table.string('phone')
      table.timestamps()
    })
  }

  down () {
    this.drop('checkoutinfos')
  }
}

module.exports = CheckoutinfosSchema
