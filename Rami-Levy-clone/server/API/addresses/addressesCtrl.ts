import express from 'express';
import connection from "../../DB/database";
import { RowDataPacket } from 'mysql2';
import { Request, Response } from 'express';


export const addNewUserAddress = async (req: Request, res: Response) => {
    try {
        console.log('addNewUserAddress req.body:')
        console.log(req.body)
      const { user_id,city_id,street_id,floor,apartment,zip_code,phone_number ,is_default} = req.body;
      
      if (!user_id || !city_id || !street_id || !floor || !apartment || !zip_code || !phone_number) {
        return res.status(400).send({ ok: false, error: 'missing some fields' })
      }
     
      const query = "INSERT INTO addresses (user_id,is_default,city_id,street_id,floor,apartment,zip_code,phone_number) VALUES (?,?,?,?,?,?,?,?)";
      connection.query(query, [user_id,is_default,city_id,street_id,floor,apartment,zip_code,phone_number], (err, result) => {
        if (err) {
          console.error(err)
          return res.status(500).send({ ok: false, error: err })
        }
        
        const selectQuery = "SELECT * FROM addresses WHERE user_id = ?"
        console.log(`user_id: ${user_id} `)
        connection.query(selectQuery, [user_id], (selecterr, selectresult) => {
          if (selecterr) {
            console.error(selecterr)
            return res.status(500).send({ ok: false, error: selecterr })
          }
          console.log('addNewUserAddress selectresult:')
          console.log(selectresult)
          res.send({ ok: true, selectresult })
        })
      })
    } catch (error) {
      console.error(error)
      res.status(500).send({ ok: false, error })
    }
  }
