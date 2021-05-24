import knex from '../database/connection';
import {Request, Response} from 'express';

class PointsController {
    async index(req: Request, res: Response){
        const {city, uf, items} = req.query;
        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));
        const points = await knex('points')
        .join('points_items', 'points_items.point_id', 'points.id')
        .whereIn('points_items.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*');
        //console.log(points);
        return res.json(points);
    }

    async show(req: Request, res: Response){
        try {
            const { id } = req.params;
            const point = await knex('points').where('id', id).first();
            if(!point ) return res.status(400).send({msg: 'Point no found!!!'});

            const items = await knex('items')
                .join('points_items', 'items.id', 'points_items.id')
                .where('points_items.point_id', id)
                .select('items.title');
            
            return res.status(200).send({point, items});
        } catch (error) {
            console.log(error)
        }
        
    }

    async create(req: Request, res: Response){
        const {name, email, whatsapp, latitude, logentude, city, uf, image, items} = req.body
        try 
        {
            const point = {
                email, 
                name,
                whatsapp,
                latitude, 
                logentude,
                city,
                uf,
                image: 'fake'
            }
            const trx = await knex.transaction();
            const insertedIds = await trx('points').insert(point);
            const point_id = insertedIds[0];
            console.log(point_id)
            const pointItems = items.map((item_id: number) => {
                return {
                    item_id,
                    point_id
                }
            });
            await knex('points_items').insert(pointItems);
            //trx.commit();
            console.log(insertedIds[0])
            return res.json({
                id: insertedIds,
                ...point
            });
            
            
        } catch (error) {
            console.log(error);
            return res.status(400).send({msg: error});
            
        }
        
    }
}
export default PointsController