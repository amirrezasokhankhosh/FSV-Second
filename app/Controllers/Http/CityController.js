'use strict'

const { validate } = use('Validator')

const City = use('App/Models/City')

class CityController {

    async create({request , response}){
        const validation = await validate(request.all() , {
            name : 'required'
        })
        if (!validation.fails()){
            const { name } = request.all()
            var city = new City()
            city.name = name
            await city.save()
            return response.send({"message" : "City added succesfully."})
        } else {
            return response.send({"message" : "Name is required."})
        }
    }
}

module.exports = CityController
