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
        const query = ` SELECT p.*, s.sub_food_category_name ,i.inventory_id,i.add,i.remove,i.units_stock
        ,product_img_name_b,product_img_data_b,product_img_name_a,product_img_data_a,product_image_id
        FROM products p 
        INNER JOIN sub_food_categories s 
        ON p.sub_food_category_id = s.sub_food_category_id 
        INNER JOIN inventories i
        ON p.product_id = i.product_id
        INNER JOIN products_images pi
        ON p.product_id = pi.product_id
        ;`
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

export const getProductDetailesBySubFoodCatagoryId = async (req: express.Request, res: express.Response) => {
    try {
        const { sub_food_category_id } = req.params
        if (!sub_food_category_id) {
            res.status(400).send({ ok: false, error: 'missing required fields' })
            return
        }
        const query = `
            SELECT p.*, s.sub_food_category_name 
            FROM products p 
            INNER JOIN sub_food_categories s 
            ON p.sub_food_category_id = s.sub_food_category_id 
            WHERE p.sub_food_category_id = ?;
        `;

        connection.query(query, [sub_food_category_id], (err, results, fields) => {
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