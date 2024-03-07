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

export const updateImagesWithProductId = async (req: Request, res: Response) => {
  try {
    console.log("updateImagesWithProductId req.body:", req.body);
    //@ts-ignore
    const files = req.files.imagesProduct;
    const { product_id ,field_name } = req.body;  
    console.log("product_id:", product_id);
    console.log("files:", files);
    const field_data_to_update = field_name === "A" ? "product_img_data_a" : "product_img_data_b";
    const field_name_to_update = field_name === "A" ? "product_img_name_a" : "product_img_name_b";
  const query = `UPDATE products_images SET ${field_data_to_update} = ?, ${field_name_to_update} = ? WHERE product_id = ?;`;
  connection.query(query, [files[0].buffer, files[0].originalname, product_id], (err, results, fields) => {
      try {
          console.log("results:", results);
          if (err) throw err;
          console.log("results:", results);
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
}


export const deleteSingleImage = async (req: Request, res: Response) => {
  try {
    console.log("delete single pic in server req.params:", req.params);
    const { product_id, isA } = req.params;
    if (!product_id) {
        res.status(400).send({ ok: false, error: 'missing required fields' });
        return;
    }
    const query = isA === "true"
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
