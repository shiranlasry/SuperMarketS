
//vscode productsInventoriesCtrl.ts 

import express from 'express';
import connection from '../../../DB/database';


export const addNewProductInventory = async (req: express.Request, res: express.Response) => { 
    try {
        const { product_id,add } = req.body
        if (!product_id || !add) {
          res.status(400).send({ ok: false, error: 'missing required fields' })
          return
        }
     
        const last_update_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        console.log(last_update_date)
        const query = `
        INSERT INTO rami_levy_db.inventories (product_id, last_update_date, \`add\`, units_stock)   
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE \`add\` = units_stock;
    `;
        connection.query(query,[product_id,last_update_date,add,add], (err, results, fields) => {
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
    
export const updateInventory = async (req: express.Request, res: express.Response) => {
    try {
        const { product_id, units_stock } = req.body;
        if (!product_id || !units_stock) {
            res.status(400).send({ ok: false, error: 'missing required fields' });
            return;
        }
        const query = `UPDATE inventories SET units_stock = ? WHERE product_id = ?;`;
        connection.query(query, [units_stock, product_id], (err, results, fields) => {
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

export const deleteInventory = async (req: express.Request, res: express.Response) => {
    try {
        const { product_id } = req.params;
        if (!product_id) {
            res.status(400).send({ ok: false, error: 'missing required fields' });
            return;
        }
        const query = `DELETE FROM inventories WHERE product_id = ?;`;
        connection.query(query, [product_id], (err, results, fields) => {
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