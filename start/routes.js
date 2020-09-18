'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
// THESE ROUTES MUST CHANGE TO FACTORY AND SEEDS
Route.post('/create_rolls', 'RoleController.create')
Route.post('/admin', 'RoleController.admin').middleware('auth')

// USER ROUTES
Route.post('/register', 'UserController.register') //  CHECK
Route.post('/login', 'UserController.login') //  CHECK

// PRODUCT ROUTES
Route.post('/product', 'ProductController.create').middleware('auth') //  CHECK
Route.get('/products', 'ProductController.show').middleware('auth') //  CHECK

// CATEGORY ROUTES
Route.post('/category', 'CategoryController.create').middleware('auth') //  CHECK

// COMMENT ROUTES
Route.post('/comment/:product_id', 'CommentController.create').middleware('auth') //  CHECK
Route.get('/comment/:comment_id', 'CommentController.read').middleware('auth') //  CHECK

// CITY ROUTES
Route.post('/city', 'CityController.create').middleware('auth') //  CHECK

// CUSTOMER ROUTES
Route.post('/customer', 'CustomerController.create').middleware('auth') //  CHECK

// CHECKOUT INFO ROUTES
Route.post('/checkoutinfo', 'CheckoutinfoController.create').middleware(['auth', 'is:admin'])
Route.delete('/checkoutinfo/:checkoutinfo_id', 'CheckoutinfoController.delete').middleware(['auth', 'is:admin'])

// SHOPPING CARD ROUTES
Route.post('/shoppingcard', 'ShoppingcardController.create').middleware(['auth', 'is:admin'])
Route.get('/shoppingcards', 'ShoppingcardController.read').middleware(['auth', 'is:admin'])
Route.put('/shoppingcard/:shoppingcard_id', 'ShoppingcardController.update').middleware(['auth', 'is:admin'])

// ORDER ROUTES
Route.post('/order', 'OrderController.create').middleware(['auth', 'is:admin'])
Route.put('/order/:order_id', 'OrderController.readyToSend').middleware(['auth', 'can:ready_order' || 'is:admin'])
Route.get('/orders', 'OrderController.readAll').middleware(['auth', 'can:read_order' || 'is:admin'])
Route.get('/received/:order_id', 'OrderController.received').middleware(['auth', 'is:admin'])
