import connection from "../../DB/database";
import express from 'express';

//in DB: order_id, cart_id, user_id, delivery_id, order_creation_date(DATETIME), status_id

export const getAllOrders = async (req: express.Request, res: express.Response) => {
    try {
        const query = "SELECT * FROM  rami_levy_db.orders;"
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

export const getOrderById = async (req: express.Request, res: express.Response) => {
    try {
        const { order_id } = req.params
        if (!order_id) {
            res.status(400).send({ ok: false, error: 'missing required fields' })
            return
        }
        const query = "SELECT * FROM  rami_levy_db.orders WHERE order_id = ?;"
        connection.query(query, [order_id], (err, results, fields) => {
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

export const addNewOrder = async (req: express.Request, res: express.Response) => {
    try {
        const { cart_id, user_id, delivery_id, order_creation_date, status_id } = req.body
        if (!cart_id || !user_id || !delivery_id || !order_creation_date || !status_id) {
            res.status(400).send({ ok: false, error: 'missing required fields' })
            return
        }
        const query = "INSERT INTO rami_levy_db.orders (cart_id, user_id, delivery_id, order_creation_date, status_id) VALUES (?, ?, ?, ?, ?);"
        connection.query(query, [cart_id, user_id, delivery_id, order_creation_date, status_id], (err, results, fields) => {
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

export const updateOrder = async (req: express.Request, res: express.Response) => {
    try {
        const { order_id, cart_id, user_id, delivery_id, order_creation_date, status_id } = req.body
        if (!order_id || !cart_id || !user_id || !delivery_id || !order_creation_date || !status_id) {
            res.status(400).send({ ok: false, error: 'missing required fields' })
            return
        }
        const query = "UPDATE rami_levy_db.orders SET cart_id = ?, user_id = ?, delivery_id = ?, order_creation_date = ?, status_id = ? WHERE order_id = ?;"    
        connection.query(query, [cart_id, user_id, delivery_id, order_creation_date, status_id, order_id], (err, results, fields) => {
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

export const deleteOrder = async (req: express.Request, res: express.Response) => {
    try {
        const { order_id } = req.params
        if (!order_id) {
            res.status(400).send({ ok: false, error: 'missing required fields' })
            return
        }
        const query = "DELETE FROM rami_levy_db.orders WHERE order_id = ?;"
        connection.query(query, [order_id], (err, results, fields) => {
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