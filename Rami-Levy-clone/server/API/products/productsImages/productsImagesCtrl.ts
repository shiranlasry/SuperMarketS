import express from "express";
import connection from "../../../DB/database";
import fs from "fs";
import multer from "multer";
import { Request, Response } from "express";

export const addNewProductImages = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    console.log("req.body:", req.files);
    //@ts-ignore
    const files = req.files.imagesProduct;
    console.log("files:", files);
    if (!files) {
      res.status(400).send({ ok: false, error: "no files were uploaded." });
      return;
    }
    const { product_id } = req.body;
    const { originalname: originalname_a, buffer: buffer_a } =
      files && files[0] ? files[0] : { originalname: null, buffer: null };
    const { originalname: originalname_b, buffer: buffer_b } =
      files && files[1] ? files[1] : { originalname: null, buffer: null };

    const imageData = {
      product_id: product_id,
      product_img_name_a: originalname_a,
      product_img_name_b: originalname_b,
      product_img_data_a: buffer_a,
      product_img_data_b: buffer_b,
    };
    console.log("imageData:", imageData);
    const query = "INSERT INTO products_images SET ?";
    connection.query(query, imageData, (err, results) => {
      if (err) {
        console.error("Error inserting image into database:", err);
        res
          .status(500)
          .send({ ok: false, error: "Error inserting image into database" });
      } else {
        console.log("Image inserted into database:", results);
      }
    });

    res
      .status(200)
      .send({ ok: true, message: "Images uploaded successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).send({ ok: false, error });
  }
};

export const deleteImagesWithProductId = async (req: Request, res: Response) => {
  try {
    const { product_id } = req.params
      if (!product_id) {
          res.status(400).send({ ok: false, error: 'missing required fields' })
          return
      }
      const query = `DELETE FROM products_images WHERE product_id = ?;`
      connection.query(query, [product_id], (err, results, fields) => {
        try {
            console.log("results:", results);
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

export const updateImagesWithProductId = async (req, res) => {
  try {
    const { product_id } = req.body; // Access parameters from the request body
    const { product_img_name_a, product_img_data_a, product_img_name_b, product_img_data_b } = req.body; // Destructure parameters from the request body
    console.log("req.body:", req.body); // Log request body for debugging
    
    // Check if product_id is missing
    if (!product_id) {
        res.status(400).send({ ok: false, error: 'missing required fields' });
        return;
    }
    
    const query = (product_img_name_a && product_img_data_a) ? `UPDATE products_images SET product_img_name_a = ?, product_img_data_a = ? WHERE product_id = ?;` : `UPDATE products_images SET product_img_name_b = ?, product_img_data_b = ? WHERE product_id = ?;`
    
    // Execute the query with parameter values
    connection.query(query, [product_img_name_a, product_img_data_a, product_img_name_b, product_img_data_b, product_id], (err, results, fields) => {
      if (err) {
        console.error(err);
        res.status(500).send({ ok: false, error: err });
        return;
      }
      console.log("results:", results);
      res.send({ ok: true, results });
    });
  } catch (error) {
      console.error(error);
      res.status(500).send({ ok: false, error });
  }
}


export const deleteSingleImage = async (req: Request, res: Response) => {
  try {
    const { product_id, isA } = req.params;
    if (!product_id) {
        res.status(400).send({ ok: false, error: 'missing required fields' });
        return;
    }
    const isImageA = isA === 'true'; // Convert string to boolean
    const query = isImageA
      ? `UPDATE products_images SET product_img_name_a = ?, product_img_data_a = ? WHERE product_id = ?;`
      : `UPDATE products_images SET product_img_name_b = ?, product_img_data_b = ? WHERE product_id = ?;`;
    connection.query(query,  [null, null, product_id], (err, results, fields) => {
        try {
            console.log("results:", results);
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
};
