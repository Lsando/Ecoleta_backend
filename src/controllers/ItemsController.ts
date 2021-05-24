import knex from '../database/connection';
import {Request, Response} from 'express'

class PointsController{
    async index(request: Request, response: Response){
        try {
            const items = await knex('items').select('*');
            const serializedItems = items.map(item => {
                return {
                    id: item.id,
                    title: item.title,
                    image_url: `http://localhost:3333/uploads/${item.image}`
                }
            });
         return response.json(serializedItems);
        } catch (error) {
            console.log(error) 
        }
        
    }
}

export default PointsController 