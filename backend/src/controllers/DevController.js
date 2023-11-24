//index, show, store, update & destroy, são funções basicas de um controller
import axios from 'axios';
import { Dev } from '../models/Dev.js';
import { parseStringAsArray } from '../utils/parseStringAsArray.js';

export default{
    async index(request, response){
        const devs = await Dev.find()
        return response.json(devs)
    },

    async store(request, response){ 
        const { github_username , techs, latitude, longitude}= request.body 
        let dev = await Dev.findOne({github_username})  // verificar a existencia do dev, p/ evitar duplicidade 
        if(!dev){
            const apiresponse = await axios.get(`https://api.github.com/users/${github_username}`)
            const { name = login, avatar_url, bio } = apiresponse.data
            const techsArray = parseStringAsArray (techs)
            const location = {
                type: 'Point',
                coordinates: [longitude,latitude]
            }
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs:techsArray,
                location
            }) 
        }
        return response.json(dev)
    },

    async update(req, res) {
        const { id } = req.params;
        const { techs, latitude, longitude, bio, name} = req.body;

        const dev = await Dev.findById(id);
        if (!dev){
          return res.status(400).json({error: 'Dev não foi encontrado!'})
        }
    
        const techsArray = parseStringAsArray(techs);
        const location = {
          type: 'Point',
          coordinates: [longitude, latitude]
        };
    
        const devUpdated = await dev.updateOne({
            name,
            bio,
            techs: techsArray,
            location
        });
        return res.json(devUpdated);
      },
    
      async destroy(req, res){
        const {id} = req.params;
        const dev = await Dev.findById(id);
        if(!dev){
          return res.status(400).json({error: 'Dev não foi encontrado!'});
        }
        await dev.remove();
        res.json({message: "Dev removido com sucesso!"})
      }
}