import connection from "../../DB/database";
import express from 'express';

//in DB: list_id, product_id, product_amount

export const getAllLists = async (req: express.Request, res: express.Response) => {
    try {
        const query = "SELECT * FROM  rami_levy_db.lists;"
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

export const getListById = async (req: express.Request, res: express.Response) => {
    try {
        const { list_id } = req.params
        if (!list_id) {
            res.status(400).send({ ok: false, error: 'missing required fields' })
            return
        }
        const query = "SELECT * FROM  rami_levy_db.lists WHERE list_id = ?;"
        connection.query(query, [list_id], (err, results, fields) => {
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

export const addNewList = async (req: express.Request, res: express.Response) => {
    try {
        const { product_id, product_amount } = req.body
        if (!product_id || !product_amount) {
            res.status(400).send({ ok: false, error: 'missing required fields' })
            return
        }
        const query = "INSERT INTO rami_levy_db.lists (product_id, product_amount) VALUES (?, ?);"
        connection.query(query, [product_id, product_amount], (err, results, fields) => {
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

export const updateList = async (req: express.Request, res: express.Response) => {
    try {
        const { list_id, product_id, product_amount } = req.body
        if (!list_id || !product_id || !product_amount) {
            res.status(400).send({ ok: false, error: 'missing required fields' })
            return
        }
        const query = "UPDATE rami_levy_db.lists SET product_id = ?, product_amount = ? WHERE list_id = ?;"
        connection.query(query, [product_id, product_amount, list_id], (err, results, fields) => {
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

export const deleteList = async (req: express.Request, res: express.Response) => {
    try {
        const { list_id } = req.params
        if (!list_id) {
            res.status(400).send({ ok: false, error: 'missing required fields' })
            return
        }
        const query = "DELETE FROM rami_levy_db.lists WHERE list_id = ?;"
        connection.query(query, [list_id], (err, results, fields) => {
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
