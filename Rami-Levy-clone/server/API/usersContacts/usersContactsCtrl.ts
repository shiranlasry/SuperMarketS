import express, { Request, Response } from 'express';
import connection from "../../DB/database";
import { RowDataPacket } from 'mysql2';




export const addNewContact = async (req: Request, res: Response) => {
    try {
        const { contact_name, contact_phone_number }: { contact_name: string, contact_phone_number: string } = req.body;
        if (!contact_name || !contact_phone_number) {
            throw new Error('Invalid credentials addNewContact()');
        }
        
        // Check if the contact already exists
        const selectQuery = `SELECT * FROM users_contacts WHERE contact_name = ? AND contact_phone_number = ?`;
        connection.query(selectQuery, [contact_name, contact_phone_number], (err, results: RowDataPacket[]) => {
            if (err) {
                console.error('Error selecting existing contact:', err);
                throw err;
            }
            if (results.length > 0) {
                console.log('Contact already exists. user_contact_id:', results[0].user_contact_id);
                res.json({ ok: true, insertId: results[0].user_contact_id });
                return;
            }
            
            // Insert new contact if it doesn't exist
            const insertQuery = `INSERT INTO users_contacts (contact_name, contact_phone_number) VALUES (?, ?)`;
            connection.query(insertQuery, [contact_name, contact_phone_number], (err, insertResults) => {
                if (err) {
                    console.error('Error adding new contact:', err);
                    throw err;
                }
                //@ts-ignore
                const insertId = insertResults?.insertId || undefined;
                console.log('New contact added. insertId:', insertId);
                res.json({ ok: true, insertId: insertId });
            });
        });
    }
    catch (error) {
        console.error('Error in addNewContact:', error);
        res.status(500).json({ ok: false, error: 'Internal server error' });
    }
}

