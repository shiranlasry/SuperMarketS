import connection from "../../DB/database";
import express from 'express';



export const getAllRoles = async (req: express.Request, res: express.Response) => {
    try {
      const query = "SELECT * FROM  rami_levy_db.roles;"
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