'use strict'

const { validate } = use('Validator')
const Comment = use('App/Models/Comment')
const Product = use('App/Models/Product')

class CommentController {

    async create({ params, request, response , auth}) {
        const validation = await validate(request.all() , {
            message : 'required'
        })
        if(!validation.fails()){
            const { message } = request.all()
            const user = await auth.getUser()
            var comment = new Comment()
            comment.user_id = user.id 
            comment.product_id = params.product_id
            comment.message = message
            await comment.save()
            return response.send({"message" : "Comment added succesfully."})
        } else {
            return response.send({"message" : "Message is required!"})
        }
    }

    async read({params , response }){
        const comment = await Comment.find(params.comment_id)
        const product = await Product.find(comment.toJSON().product_id)
        return response.send({comment , product})
    }
}

module.exports = CommentController
