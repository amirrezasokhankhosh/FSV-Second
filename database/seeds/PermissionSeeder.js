'use strict'

/*
|--------------------------------------------------------------------------
| PermissionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Permission = use('App/Models/Permission')
const Role = use('App/Models/Role')

class PermissionSeeder {
  async run () {
    var create_checkoutinfo = await Permission.create({
      name : "Create Checkout info",
      slug : "create_chechoutinfo",
      description : "Create checkout info Permission",
    })

    var delete_checkoutinfo = await Permission.create({
      name : "Delete Checkout info",
      slug : "delete_chechoutinfo",
      description : "Delete checkout info Permission",
    })

    var create_shoppingcard = await Permission.create({
      name : "Create Shopping card",
      slug : "create_shoppingcard",
      description : "Create Shopping card Permission",
    })

    var update_shoppingcard = await Permission.create({
      name : "Update Shopping card",
      slug : "update_shoppingcard",
      description : "Update Shopping card Permission",
    })

    var read_shoppingcard = await Permission.create({
      name : "Read Shopping card",
      slug : "read_shoppingcard",
      description : "Read Shopping card Permission",
    })

    var create_order = await Permission.create({
      name : "Create Order",
      slug : "create_order",
      description : "Create Order Permission",
    })

    var ready_order = await Permission.create({
      name : "Ready Order",
      slug : "ready_order",
      description : "Ready Order to sending Permission",
    })

    var read_order = await Permission.create({
      name : "Read Order",
      slug : "read_order",
      description : "Read Order Permission",
    })

    var customer = await Role.findBy('slug', "customer")
    await customer.permissions().attach([
      create_checkoutinfo.id ,
      delete_checkoutinfo.id ,
      create_shoppingcard.id ,
      update_shoppingcard.id ,
      read_shoppingcard.id ,
      create_order.id ,
      ready_order.id ,
      read_order.id ,
    ])


  }
}

module.exports = PermissionSeeder
