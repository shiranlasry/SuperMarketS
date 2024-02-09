import express from 'express';
import connection from '../../../DB/database';



export const addNewProductDetailes = async (req: express.Request, res: express.Response) => {
    try {
        const { sub_food_category_id, product_price, product_name, product_description, export_country, brand, content, allergy_info, type, israel_milk, cosher } = req.body
        if (!sub_food_category_id || !product_price || !product_name || !product_description ) {
            res.status(400).send({ ok: false, error: 'missing required fields' })
            return
        }
        const query = `INSERT INTO rami_levy_db.products (sub_food_category_id,product_price,product_name,product_description,export_country,brand,content,allergy_info,type,israel_milk,cosher)
        VALUES (?,?,?,?,?,?,?,?,?,?,?);`
        connection.query(query, [sub_food_category_id, product_price, product_name, product_description, export_country, brand, content, allergy_info, type, israel_milk, cosher], (err, results, fields) => {
            try {
                if (err) throw err;
                res.send({ ok: true, results })
            } catch (error) {
                console.error(error)
                res.status(500).send({ ok: false, error })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({ ok: false, error })
    }
}

export const getAllProductDetailes = async (req: express.Request, res: express.Response) => {   
    try {
        const query = `SELECT * FROM rami_levy_db.products`
        connection.query(query, (err, results, fields) => {
            try {
                if (err) throw err;
                res.send({ ok: true, results })
            } catch (error) {
                console.error(error)
                res.status(500).send({ ok: false, error })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({ ok: false, error })
    }
}
