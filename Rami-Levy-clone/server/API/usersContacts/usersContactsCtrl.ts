import express, { Request, Response } from 'express';
import connection from "../../DB/database";
import { RowDataPacket } from 'mysql2';




export const addNewContact = async (req: Request, res: Response) => {
    try {
        const { contact_name, contact_phone_number }: { contact_name: string, contact_phone_number: string } = req.body;
        const query = `INSERT INTO users_contacts (contact_name, contact_phone_number) VALUES (?, ?)`;
       
        connection.query(query,[contact_name, contact_phone_number], (err, results: RowDataPacket[]) => {
            if (err) {
                console.error('Error addNewContact:', err);
                throw err;
            }
            res.json({ ok: true, results });
        });
    }
    catch (error) {
        console.error('Error getAllUsers:', error);
        throw error;
    }
}