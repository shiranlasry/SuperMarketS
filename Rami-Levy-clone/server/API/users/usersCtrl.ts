
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
  address: string;
  role: string;

}
const saltRounds = 10; 

export const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
// select users and users roles and address from users table and roles table

    const query = "SELECT * FROM users INNER JOIN roles ON users.role_id = roles.role_id INNER JOIN addresses ON users.user_id = addresses.user_id";
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
export const registerUser = async (req: express.Request, res: express.Response) => {
  try {
    const { email,id_number, password, first_name, last_name,  role_id } = req.body;
    console.log(req.body)
    if (!email || !password || !first_name || !last_name || !role_id) {
      throw new Error("Missing fields");
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash password
    const query = "INSERT INTO users (email,id_number, password, first_name, last_name,  role_id) VALUES (?,?,?,?,?,?)";
    connection.query(query, [email,id_number, hashedPassword, first_name, last_name, role_id], (err, results, fields) => {
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
