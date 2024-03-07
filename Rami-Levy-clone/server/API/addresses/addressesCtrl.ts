import express from 'express';
import connection from "../../DB/database";
import { RowDataPacket } from 'mysql2';
import { Request, Response } from 'express';


export const addNewUserAddress = async (req: Request, res: Response) => {
    try { 
      const { user_id,city_id,street_id,floor,apartment,zip_code,phone_number ,is_default,address_name} = req.body;
      
      if (!user_id || !city_id || !street_id || !floor || !apartment || !zip_code || !phone_number  || !address_name) {
        return res.status(400).send({ ok: false, error: 'missing some fields' })
      }
      const setAllNotDefault = `UPDATE addresses SET is_default = 0 WHERE user_id = ?;`
      connection.query(setAllNotDefault, [user_id], (err, result) => {
        if (err) {
          console.error(err)
          return res.status(500).send({ ok: false, error: err })
        }
      })
     
      const query = "INSERT INTO addresses (user_id,is_default,city_id,street_id,floor,apartment,zip_code,phone_number,address_name) VALUES (?,?,?,?,?,?,?,?,?)";
      connection.query(query, [user_id,is_default,city_id,street_id,floor,apartment,zip_code,phone_number,address_name], (err, result) => {
        if (err) {
          console.error(err)
          return res.status(500).send({ ok: false, error: err })
        }
        
        const selectQuery = `SELECT a.*,c.city_name,s.street_name
        FROM addresses a
        INNER JOIN cities c 
        ON c.city_id= a.city_id 
        INNER JOIN streets s ON s.street_id= a.street_id WHERE user_id = ?;`
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

  export const getUserAddresses = async (req: Request, res: Response) => {
    try {
      const { user_id } = req.params;
      if (!user_id) {
        return res.status(400).send({ ok: false, error: 'missing some fields' })
      }
      const query =`SELECT a.*,c.city_name,s.street_name
      FROM addresses a
      INNER JOIN cities c 
      ON c.city_id= a.city_id 
      INNER JOIN streets s ON s.street_id= a.street_id WHERE user_id = ?;`
      connection.query(query, [user_id], (err, result) => {
        if (err) {
          console.error(err)
          return res.status(500).send({ ok: false, error: err })
        }
        res.send({ ok: true, result })
      })
    } catch (error) {
      console.error(error)
      res.status(500).send({ ok: false, error })
    }
  }
