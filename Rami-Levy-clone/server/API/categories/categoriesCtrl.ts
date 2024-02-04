import connection from "../../DB/database";
import { Request, Response } from 'express';

export const getFoodCategories = async (req: Request, res: Response) => {
    try {

        const query = "SELECT * FROM rami_levy_db.food_categories;"
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
export const getSUBFoodCategories = async (req: Request, res: Response) => {
    try {
        const query = "SELECT * FROM rami_levy_db.sub_food_categories;"
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