import express from 'express';
import connection from '../../DB/database';


export const getAllSales = async (req: express.Request, res: express.Response) => {
    try {
        const query = `SELECT * FROM rami_levy_db.sales;`;
        connection.query(query, (err, results, fields) => {
            try {
                if (err) throw err;
                res.send({ ok: true, results });
            } catch (error) {
                console.error(error);
                res.status(500).send({ ok: false, error });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ ok: false, error });
    }
}

export const getSaleById = async (req: express.Request, res: express.Response) => {
    try {
        const { sale_id } = req.params;
        const query = `SELECT * FROM rami_levy_db.sales WHERE sale_id = ?;`;
        connection.query(query, [sale_id], (err, results, fields) => {
            try {
                if (err) throw err;
                res.send({ ok: true, results });
            } catch (error) {
                console.error(error);
                res.status(500).send({ ok: false, error });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ ok: false, error });
    }
}

export const addNewSale = async (req: express.Request, res: express.Response) => {
    try {
        const { sale_description, sale_expiration_date, sale_discount, product_id } = req.body;
        console.log("addNewSale", req.body);
        const query = `INSERT INTO rami_levy_db.sales (sale_description, sale_expiration_date, sale_discount, product_id) VALUES (?,?,?,?);`;
        connection.query(query, [sale_description, sale_expiration_date, sale_discount, product_id], (err, results, fields) => {
            try {
                if (err) throw err;
                res.send({ ok: true, results });
            } catch (error) {
                console.error(error);
                res.status(500).send({ ok: false, error });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ ok: false, error });
    }
}

export const updateSale = async (req: express.Request, res: express.Response) => {
    try {
        const { sale_description, sale_expiration_date, sale_discount, product_id, sale_id } = req.body;
        const query = `UPDATE rami_levy_db.sales SET sale_description = ?, sale_expiration_date = ?, sale_discount = ?, product_id = ? WHERE sale_id = ?;`;
        connection.query(query, [sale_description, sale_expiration_date, sale_discount, product_id, sale_id], (err, results, fields) => {
            try {
                if (err) throw err;
                res.send({ ok: true, results });
            } catch (error) {
                console.error(error);
                res.status(500).send({ ok: false, error });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ ok: false, error });
    }
}

export const deleteSale = async (req: express.Request, res: express.Response) => {
    try {
        const { sale_id } = req.params;
        const query = `DELETE FROM rami_levy_db.sales WHERE sale_id = ?;`;
        connection.query(query, [sale_id], (err, results, fields) => {
            try {
                if (err) throw err;
                res.send({ ok: true, results });
            } catch (error) {
                console.error(error);
                res.status(500).send({ ok: false, error });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ ok: false, error });
    }
}


