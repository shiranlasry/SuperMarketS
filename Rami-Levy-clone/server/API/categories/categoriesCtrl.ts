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
        const query = "SELECT sub_food_categories.sub_food_category_id,sub_food_categories.sub_food_category_name,sub_food_categories.food_category_id,food_categories.food_category_name FROM sub_food_categories JOIN  food_categories ON sub_food_categories.food_category_id = food_categories.food_category_id;"
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

//get subcategories's navbar_item_id
export const getSubCategoriesNavBarItem = async (req: Request, res: Response) => {
    try {
        const { navbarItemId } = req.params;
        const query = `SELECT navbar_item_id From sub_food_categories WHERE sub_food_category_id = ${navbarItemId};`
        connection.query(query, (err, results) => {
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