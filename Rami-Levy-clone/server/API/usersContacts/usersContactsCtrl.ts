import express, { Request, Response } from 'express';
import connection from "../../DB/database";
import { RowDataPacket } from 'mysql2';




export const addNewContact = async (req: Request, res: Response) => {
    try {
        const { contact_name, contact_phone_number }: { contact_name: string, contact_phone_number: string } = req.body;
        if (!contact_name || !contact_phone_number) {
            res.json({ ok: false, message: 'Invalid credentials' });
            return;
        }
        const selectQuery = `SELECT * FROM users_contacts WHERE contact_name = ? AND contact_phone_number = ?`;
        connection.query(selectQuery, [contact_name, contact_phone_number], (err, results: RowDataPacket[]) => {
            if (err) {
                console.error('Error addNewContact:', err);
                throw err;
            }
            if (results.length > 0) {
                res.json({ ok: true, results: results[0].user_contact_id });
                return;
            }
            else{
                const query = `INSERT INTO users_contacts (contact_name, contact_phone_number) VALUES (?, ?)`;
       
                connection.query(query,[contact_name, contact_phone_number], (err, results: RowDataPacket[]) => {
                    if (err) {
                        console.error('Error addNewContact:', err);
                        throw err;
                    }
                    //@ts-ignore
                    res.json({ ok: true, insertId: results.insertId });
                });
            }
        });

        
    }
    catch (error) {
        console.error('Error getAllUsers:', error);
        throw error;
    }
}