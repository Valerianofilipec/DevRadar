import { Dev } from '../models/Dev.js';
import { parseStringAsArray } from '../models/utils/parseStringAsArray.js';

export default{
    async index(request, response){//buscar todos devs no de raio 10 km & filtrar por tecnologias 
        const { latitude, longitude, techs} = request.querty
        const techsArray = parseStringAsArray(techs)
        const devs = await  Dev.find({
            techs: {
                $in: techsArray
            },
            location: {
                $near:{
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance : 10000
                }
            }
        })

        console.log(latitude, longitude, techsArray)//DEBUG
        return response.json({devs})
    }

}