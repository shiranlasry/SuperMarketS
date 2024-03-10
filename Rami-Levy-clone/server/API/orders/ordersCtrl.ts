import connection from "../../DB/database";
import express from "express";

//in DB: order_id, cart_id, user_id, delivery_id, order_creation_date(DATETIME), status_id

export const getAllOrders = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const query = "SELECT * FROM  rami_levy_db.orders;";
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

export const getOrderById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { order_id } = req.params;
    if (!order_id) {
      res.status(400).send({ ok: false, error: "missing required fields" });
      return;
    }
    const query = "SELECT * FROM  rami_levy_db.orders WHERE order_id = ?;";
    connection.query(query, [order_id], (err, results, fields) => {
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

export const addNewOrder = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { cart_id, user_id, order_creation_date ,status,delivery_id,how_receive_shipment,alternative_products} = req.body;
    if (!cart_id || !user_id || !order_creation_date || !status || !delivery_id || !how_receive_shipment || !alternative_products) {
      res.status(400).send({ ok: false, error: "missing required fields" });
      return;
    }
    const query = `INSERT INTO rami_levy_db.orders (cart_id, user_id, order_creation_date, status_id, delivery_id, how_receive_shipment, alternative_products)
    VALUES (?, ?, ?, ?, ?, ?, ?);`;
    connection.query(
      query,
      [cart_id, user_id, order_creation_date, status, delivery_id, how_receive_shipment, alternative_products],
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

export const updateOrder = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const {
      order_id,
      cart_id,
      user_id,
      delivery_id,
      order_creation_date,
      status_id,
    } = req.body;
    console.log(
      "updateOrder Server",
      order_id,
      cart_id,
      user_id,
      delivery_id,
      order_creation_date,
      status_id
    );

    // Check if order_id is provided
    if (!order_id) {
      return res.status(400).send({ ok: false, error: "Missing order_id" });
    }

    // Create arrays to store columns and values for the SET clause
    const columns: string[] = [];
    const values: (number | string | Date)[] = [];

    // Push non-undefined parameters to columns and values arrays
    if (cart_id !== undefined) {
      columns.push("cart_id");
      values.push(cart_id);
    }
    if (user_id !== undefined) {
      columns.push("user_id");
      values.push(user_id);
    }
    if (delivery_id !== undefined) {
      columns.push("delivery_id");
      values.push(delivery_id);
    }
    if (order_creation_date !== undefined) {
      columns.push("order_creation_date");
      values.push(order_creation_date);
    }
    if (status_id !== undefined) {
      columns.push("status_id");
      values.push(status_id);
    }

    // Check if any parameters were provided
    if (columns.length === 0) {
      return res
        .status(400)
        .send({ ok: false, error: "No parameters provided for update" });
    }

    // Construct the SQL query
    const query = `UPDATE rami_levy_db.orders SET ${columns
      .map((column) => `${column} = ?`)
      .join(", ")} WHERE order_id = ?;`;

    // Add order_id to values array
    values.push(order_id);

    // Execute the query
    connection.query(query, values, (err, results, fields) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .send({ ok: false, error: "Failed to update order" });
      }
      res.send({ ok: true, results });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ ok: false, error: "Internal server error" });
  }
};

export const deleteOrder = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { order_id } = req.params;
    if (!order_id) {
      res.status(400).send({ ok: false, error: "missing required fields" });
      return;
    }
    const query = "DELETE FROM rami_levy_db.orders WHERE order_id = ?;";
    connection.query(query, [order_id], (err, results, fields) => {
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

export const getUserOrders = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { user_id } = req.params;
    if (!user_id) {
      res.status(400).send({ ok: false, error: "missing required fields" });
      return;
    }
    const query = `SELECT * FROM rami_levy_db.orders
        WHERE user_id = ?;`;
    connection.query(query, [user_id], (err, results, fields) => {
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

export const getUserOrderCartDetails = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { cart_id } = req.params;
    if (!cart_id) {
      res.status(400).send({ ok: false, error: "missing required fields" });
      return;
    }
    const query = `
        SELECT l.cart_id ,l.product_id ,l.product_amount,p.product_name,p.product_description,p.product_price
        ,i.product_img_name_a,i.product_img_name_b,i.product_img_data_b,i.product_img_data_a
        FROM orders o
        LEFT JOIN lists l ON o.cart_id = l.cart_id
        LEFT JOIN products p ON l.product_id = p.product_id
        LEFT JOIN products_images i ON i.product_id = p.product_id
        WHERE l.cart_id = ?;
        `;
    connection.query(query, [cart_id], (err, results, fields) => {
      try {
        if (err) throw err;
        console.log("getUserOrderCartDetails", results);
       
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
