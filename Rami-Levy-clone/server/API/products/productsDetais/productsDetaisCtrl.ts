import express from "express";
import connection from "../../../DB/database";

export const addNewProductDetailes = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const {
      sub_food_category_id,
      product_price,
      product_name,
      product_description,
      export_country,
      brand,
      content,
      allergy_info,
      type,
      israel_milk,
      cosher,
      product_components,
      serving_suggestion,
    } = req.body;
    if (
      !sub_food_category_id ||
      !product_price ||
      !product_name ||
      !product_description
    ) {
      res.status(400).send({ ok: false, error: "missing required fields" });
      return;
    }
    const query = `INSERT INTO rami_levy_db.products (sub_food_category_id,product_price,product_name,product_description,export_country,brand,content,allergy_info,type,israel_milk,cosher,product_components,serving_suggestion)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);`;
    connection.query(
      query,
      [
        sub_food_category_id,
        product_price,
        product_name,
        product_description,
        export_country,
        brand,
        content,
        allergy_info,
        type,
        israel_milk,
        cosher,
        product_components,
        serving_suggestion,
      ],
      (err, results, fields) => {
        try {
          if (err) throw err;
          res.send({ ok: true, results });
        } catch (error) {
          console.error(error);
          res.status(500).send({ ok: false, error });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send({ ok: false, error });
  }
};

export const getAllProductDetailes = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const query = ` 
    SELECT 
    p.*, 
    s.sub_food_category_name, 
    s.navbar_item_id,
    f.food_category_name,
    f.food_category_id, 
    i.inventory_id, 
    i.add, 
    i.remove, 
    i.units_stock,
    pi.product_img_name_b, 
    pi.product_img_data_b, 
    pi.product_img_name_a,
    pi.product_img_data_a, 
    pi.product_image_id,
    n.label AS navbar_item_name
FROM 
    products p
INNER JOIN 
    sub_food_categories s ON p.sub_food_category_id = s.sub_food_category_id
INNER JOIN 
    food_categories f ON f.food_category_id = s.food_category_id
INNER JOIN 
    inventories i ON p.product_id = i.product_id
INNER JOIN 
    products_images pi ON p.product_id = pi.product_id
INNER JOIN 
    navbar_items n ON n.navbar_item_id = s.navbar_item_id;`;
    connection.query(query, (err, results, fields) => {
      try {
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

export const getProductsByNavBarItemId = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { navbar_item_id } = req.params;
    if (!navbar_item_id) {
      res.status(400).send({ ok: false, error: "missing required fields" });
      return;
    }
    const query = `SELECT 
        p.product_id, 
        p.product_name, 
        p.product_price, 
        p.product_description, 
        p.export_country, 
        p.brand, 
        p.content, 
        p.allergy_info, 
        p.type, 
        p.israel_milk, 
        p.cosher,
        p.product_components,
        p.serving_suggestion,
        s.sub_food_category_name,
        f.food_category_id,
        i.inventory_id,
        i.add,
        i.remove,
        i.units_stock,
        pi.product_img_name_b,
        pi.product_img_data_b,
        pi.product_img_name_a,
        pi.product_img_data_a,
        pi.product_image_id
    FROM 
        products p
    INNER JOIN 
        sub_food_categories s ON p.sub_food_category_id = s.sub_food_category_id
    INNER JOIN 
        food_categories f ON f.food_category_id = s.food_category_id
    INNER JOIN 
        inventories i ON p.product_id = i.product_id
    INNER JOIN 
        products_images pi ON p.product_id = pi.product_id
    WHERE 
        s.navbar_item_id =? ;`;
    connection.query(query, [navbar_item_id], (err, results, fields) => {
      try {
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

export const getProductDetailesBySubFoodCatagoryId = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { sub_food_category_id } = req.params;
    if (!sub_food_category_id) {
      res.status(400).send({ ok: false, error: "missing required fields" });
      return;
    }
    const query = `
            SELECT p.*, s.sub_food_category_name 
            FROM products p 
            INNER JOIN sub_food_categories s 
            ON p.sub_food_category_id = s.sub_food_category_id 
            WHERE p.sub_food_category_id = ?;
        `;

    connection.query(query, [sub_food_category_id], (err, results, fields) => {
      try {
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

export const deleteProduct = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    console.log("params", req.params);
    const { product_id } = req.params;
    if (!product_id) {
      res.status(400).send({ ok: false, error: "missing required fields" });
      return;
    }
    const query = `DELETE FROM products WHERE product_id = ?;`;
    connection.query(query, [product_id], (err, results, fields) => {
      try {
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

export const updateProductDetailes = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const {
      product_id,
      sub_food_category_id,
      product_price,
      product_name,
      product_description,
      export_country,
      brand,
      content,
      allergy_info,
      type,
      israel_milk,
      cosher,
      product_components,
      serving_suggestion,
    } = req.body;
    if (!product_id) {
      res.status(400).send({ ok: false, error: "missing required fields" });
      return;
    }
    const query = `UPDATE products SET sub_food_category_id = ?, product_price = ?, product_name = ?, product_description = ?, export_country = ?, brand = ?, content = ?, allergy_info = ?, type = ?, israel_milk = ?, cosher = ?,product_components = ?,serving_suggestion = ? WHERE product_id = ?;`;
    connection.query(
      query,
      [
        sub_food_category_id ? sub_food_category_id : null,
        product_price ? product_price : null,
        product_name ? product_name : null,
        product_description ? product_description : null,
        export_country ? export_country : null,
        brand ? brand : null,
        content ? content : null,
        allergy_info ? allergy_info : null,
        type ? type : null,
        israel_milk ? israel_milk : null,
        cosher ? cosher : null,
        product_components ? product_components : null,
        serving_suggestion ? serving_suggestion : null,
        product_id,
      ],
      (err, results, fields) => {
        try {
          if (err) throw err;
          res.send({ ok: true, results });
        } catch (error) {
          console.error(error);
          res.status(500).send({ ok: false, error });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send({ ok: false, error });
  }
};

export const getProductPriceById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { product_id } = req.params;
    if (!product_id) {
      res.status(400).send({ ok: false, error: "missing required fields" });
      return;
    }
    const query = `SELECT product_price FROM products WHERE product_id = ?;`;
    connection.query(query, [product_id], (err, results, fields) => {
      try {
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
