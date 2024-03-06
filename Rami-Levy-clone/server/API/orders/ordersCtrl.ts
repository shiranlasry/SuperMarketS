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
        const { cart_id, user_id, order_creation_date } = req.body
        console.log("addNewOrder Server", cart_id, user_id, order_creation_date)
        if (!cart_id || !user_id  || !order_creation_date) {
            res.status(400).send({ ok: false, error: 'missing required fields' })
            return
        }
        const query = "INSERT INTO rami_levy_db.orders (cart_id, user_id, delivery_id, order_creation_date, status_id) VALUES (?, ?, ?, ?, ?);"
        connection.query(query, [cart_id, user_id, null, order_creation_date, 2], (err, results, fields) => {
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
        const { order_id, cart_id, user_id, delivery_id, order_creation_date, status_id } = req.body;
        console.log("updateOrder Server", order_id, cart_id, user_id, delivery_id, order_creation_date, status_id);
        
        // Check if order_id is provided
        if (!order_id) {
            return res.status(400).send({ ok: false, error: 'Missing order_id' });
        }
        
        // Create arrays to store columns and values for the SET clause
        const columns: string[] = [];
        const values: (number | string | Date)[] = [];

        // Push non-undefined parameters to columns and values arrays
        if (cart_id !== undefined) {
            columns.push('cart_id');
            values.push(cart_id);
        }
        if (user_id !== undefined) {
            columns.push('user_id');
            values.push(user_id);
        }
        if (delivery_id !== undefined) {
            columns.push('delivery_id');
            values.push(delivery_id);
        }
        if (order_creation_date !== undefined) {
            columns.push('order_creation_date');
            values.push(order_creation_date);
        }
        if (status_id !== undefined) {
            columns.push('status_id');
            values.push(status_id);
        }

        // Check if any parameters were provided
        if (columns.length === 0) {
            return res.status(400).send({ ok: false, error: 'No parameters provided for update' });
        }

        // Construct the SQL query
        const query = `UPDATE rami_levy_db.orders SET ${columns.map(column => `${column} = ?`).join(', ')} WHERE order_id = ?;`;

        // Add order_id to values array
        values.push(order_id);

        // Execute the query
        connection.query(query, values, (err, results, fields) => {
            if (err) {
                console.error(err);
                return res.status(500).send({ ok: false, error: 'Failed to update order' });
            }
            res.send({ ok: true, results });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ ok: false, error: 'Internal server error' });
    }
};


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

export const getUserOrdersList = async (req: express.Request, res: express.Response) => {
    try {
        const { user_id } = req.params
        if (!user_id) {
            res.status(400).send({ ok: false, error: 'missing required fields' })
            return
        }
        const query = `SELECT o.order_creation_date, l.product_id, l.product_amount, o.cart_id
        FROM orders o
        INNER JOIN lists l 
        ON o.cart_id = l.cart_id
        WHERE o.user_id = 23;`
        connection.query(query, [user_id], (err, results, fields) => {
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