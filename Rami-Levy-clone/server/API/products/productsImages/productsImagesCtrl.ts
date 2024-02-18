import express from 'express';
import connection from '../../../DB/database';
import fs from 'fs';
import multer from 'multer';



export const addNewProductImages = async (req: express.Request, res: express.Response) => { 
    try {
      console.log('req.body:', req.files);
      //@ts-ignore
        const files = req.files.imagesProduct;
        console.log('files:', files);
        if (!files) {
            res.status(400).send({ ok: false, error: 'no files were uploaded.' });
            return;
        }
        const { product_id } = req.body;
        const { originalname:originalname_a, buffer: buffer_a} = files[0]?files[0]:null;
        const { originalname:originalname_b, buffer :buffer_b} = files[1]?files[1]:null;
        const imageData = {
                    product_id: product_id,
                    product_img_name_a: originalname_a,
                    product_img_name_b: originalname_b,
                    product_img_data_a: buffer_a,
                    product_img_data_b: buffer_b
                };
                console.log('imageData:', imageData);
          const query = 'INSERT INTO products_images SET ?';
            connection.query(query, imageData, (err, results) => {
                if (err) {
                    console.error('Error inserting image into database:', err);
                    res.status(500).send({ ok: false, error: 'Error inserting image into database' });
                } else {
                    console.log('Image inserted into database:', results);
                }
            });


        // for (const fileKey in files) {
        //     const file = files[fileKey]; // Assuming single file per fieldname
        //     const { originalname, buffer } = file;

        //     // Prepare the data to be inserted into the database
        //     const imageData = {
        //         product_id: product_id,
        //         product_img_name: originalname,
        //         product_img_data_a: buffer,
        //         product_img_data_b: buffer
        //     };

        //     // Insert the image data into the database
        //     const query = 'INSERT INTO products_images SET ?';
        //     connection.query(query, imageData, (err, results) => {
        //         if (err) {
        //             console.error('Error inserting image into database:', err);
        //             res.status(500).send({ ok: false, error: 'Error inserting image into database' });
        //         } else {
        //             console.log('Image inserted into database:', results);
        //         }
        //     });
        // }

        res.status(200).send({ ok: true, message: 'Images uploaded successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ ok: false, error });
    }
};
