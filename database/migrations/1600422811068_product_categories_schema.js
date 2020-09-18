'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductCategoriesSchema extends Schema {
  up () {
    this.create('product_categories', (table) => {
      table.increments()
      table.integer('product_id').unsigned().index()
      table.foreign('product_id').references('id').on('products').onDelete('cascade')
      table.integer('category_id').unsigned().index()
      table.foreign('category_id').references('id').on('categories').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('product_categories')
  }
}

module.exports = ProductCategoriesSchema
