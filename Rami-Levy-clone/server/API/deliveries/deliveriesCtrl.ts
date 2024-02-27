import connection from "../../DB/database"; 
import express from 'express';

//in DB: delivery_id, order_id, status_id, delivery_sinish_date(DATETIME)


export const getAllDeliveries = async (req: express.Request, res: express.Response) => {
    try {
        const query = "SELECT * FROM  rami_levy_db.deliveries;"
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

export const getDeliveryById = async (req: express.Request, res: express.Response) => {
    try {
        const { delivery_id } = req.params
        if (!delivery_id) {
            res.status(400).send({ ok: false, error: 'missing required fields' })
            return
        }
        const query = "SELECT * FROM  rami_levy_db.deliveries WHERE delivery_id = ?;"
        connection.query(query, [delivery_id], (err, results, fields) => {
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

export const addNewDelivery = async (req: express.Request, res: express.Response) => {
    try {
        const { order_id, status_id, delivery_sinish_date } = req.body
        if (!order_id || !status_id || !delivery_sinish_date) {
            res.status(400).send({ ok: false, error: 'missing required fields' })
            return
        }
        const query = "INSERT INTO rami_levy_db.deliveries (order_id, status_id, delivery_sinish_date) VALUES (?, ?, ?);"
        connection.query(query, [order_id, status_id, delivery_sinish_date], (err, results, fields) => {
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

export const updateDelivery = async (req: express.Request, res: express.Response) => {
    try {
        const { delivery_id, order_id, status_id, delivery_sinish_date } = req.body
        if (!delivery_id || !order_id || !status_id || !delivery_sinish_date) {
            res.status(400).send({ ok: false, error: 'missing required fields' })
            return
        }
        const query = "UPDATE rami_levy_db.deliveries SET order_id = ?, status_id = ?, delivery_sinish_date = ? WHERE delivery_id = ?;"
        connection.query(query, [order_id, status_id, delivery_sinish_date, delivery_id], (err, results, fields) => {
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

export const deleteDelivery = async (req: express.Request, res: express.Response) => {
    try {
        const { delivery_id } = req.params
        if (!delivery_id) {
            res.status(400).send({ ok: false, error: 'missing required fields' })
            return
        }
        const query = "DELETE FROM rami_levy_db.deliveries WHERE delivery_id = ?;"
        connection.query(query, [delivery_id], (err, results, fields) => {
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