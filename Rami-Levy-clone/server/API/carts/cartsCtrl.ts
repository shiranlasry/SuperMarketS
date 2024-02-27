import connection from "../../DB/database";
import express from 'express';

//in DB: cart_id, list_id, user_id, status_id

export const getAllCarts = async (req: express.Request, res: express.Response) => {
    try {
        const query = "SELECT * FROM  rami_levy_db.carts;"
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

export const getCartById = async (req: express.Request, res: express.Response) => {
    try {
        const { cart_id } = req.params
        if (!cart_id) {
            res.status(400).send({ ok: false, error: 'missing required fields' })
            return
        }
        const query = "SELECT * FROM  rami_levy_db.carts WHERE cart_id = ?;"
        connection.query(query, [cart_id], (err, results, fields) => {
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

export const addNewCart = async (req: express.Request, res: express.Response) => {
    try {
        const { list_id, user_id, status_id } = req.body
        if (!list_id || !user_id || !status_id) {
            res.status(400).send({ ok: false, error: 'missing required fields' })
            return
        }
        const query = "INSERT INTO rami_levy_db.carts (list_id, user_id, status_id) VALUES (?, ?, ?);"
        connection.query(query, [list_id, user_id, status_id], (err, results, fields) => {
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

export const deleteCart = async (req: express.Request, res: express.Response) => {
    try {
        const { cart_id } = req.params
        if (!cart_id) {
            res.status(400).send({ ok: false, error: 'missing required fields' })
            return
        }
        const query = "DELETE FROM rami_levy_db.carts WHERE cart_id = ?;"
        connection.query(query, [cart_id], (err, results, fields) => {
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

export const updateCart = async (req: express.Request, res: express.Response) => {
    try {
        const { cart_id, list_id, user_id, status_id } = req.body
        if (!cart_id || !list_id || !user_id || !status_id) {
            res.status(400).send({ ok: false, error: 'missing required fields' })
            return
        }
        const query = "UPDATE rami_levy_db.carts SET list_id = ?, user_id = ?, status_id = ? WHERE cart_id = ?;"
        connection.query(query, [list_id, user_id, status_id, cart_id], (err, results, fields) => {
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
