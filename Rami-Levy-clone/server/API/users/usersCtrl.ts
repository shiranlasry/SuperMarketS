
//usersCtrl.ts   server side    

import express from 'express';
import connection from "../../DB/database";
import { RowDataPacket } from 'mysql2';
import bcrypt from 'bcryptjs'; // Import bcrypt
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { Request, Response } from 'express';

interface User {
  user_id: number | null;
  email: string;
  password: string;
  username: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  role: string;

}
const saltRounds = 10;

export const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {

    const query = "SELECT * FROM  rami_levy_db.users;"
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
