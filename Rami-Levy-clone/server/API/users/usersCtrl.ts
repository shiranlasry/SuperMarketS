//usersCtrl.ts   server side

import bcrypt from "bcryptjs"; // Import bcrypt
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { RowDataPacket } from "mysql2";
import connection from "../../DB/database";

const saltRounds = 10;

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // select users and users roles from users table and roles table

    const query =
      "SELECT * FROM users INNER JOIN roles ON users.role_id = roles.role_id";
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
export const registerUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, id_number, password, first_name, last_name, role_id } =
      req.body;

    if (!email || !password || !first_name || !last_name || !role_id) {
      throw new Error("Missing fields");
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash password
    const query =
      "INSERT INTO users (email,id_number, password, first_name, last_name,  role_id) VALUES (?,?,?,?,?,?)";
    connection.query(
      query,
      [email, id_number, hashedPassword, first_name, last_name, role_id],
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

export const loginUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .send({ ok: false, error: "Missing email or password loginUser()" });
      return;
    }
    const query = `SELECT * FROM users INNER JOIN roles ON users.role_id = roles.role_id WHERE email = ?;`;

    connection.query(
      query,
      [email],
      async (err, results: RowDataPacket[], fields) => {
        try {
          if (err) throw err;

          if (results.length === 0) {
            // No user found with the provided email
            res
              .status(401)
              .send({ ok: false, error: "no mach email loginUser()" });
          } else {
            // User found, compare passwords
            const user = results[0];

            // Compare the entered password with the stored hashed password
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
              const secret = process.env.SECRET_KEY;
              const cookie = { user_id: user.user_id };
              const token = jwt.sign(cookie, secret, {
                expiresIn: "3h", // Set the expiration time as needed
              });

              // Set the token in a cookie
              res.cookie("token", token, { httpOnly: true, maxAge: 6600000 });
              res.send({ ok: true, user });
            } else {
              // Passwords don't match
              res.status(401).send({ ok: false, error: "Invalid credentials" });
            }
          }
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
export const getUserById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const user_id = req.params.user_id;
    if (!user_id) {
      throw new Error("Missing fields");
    }
    const query =
      "SELECT * FROM users INNER JOIN roles ON users.role_id = roles.role_id WHERE user_id = ?;";
    connection.query(query, [user_id], (err, results, fields) => {
      try {
        if (err) throw err;
        const user = results[0];
        res.send({ ok: true, user });
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
export const logOutUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    res.clearCookie("token");
    res.send({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ ok: false, error });
  }
};
export const getUserFromToken = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      // No token, no user connected
      res.send({ ok: true, user: null });
      return;
    }
    const secret = process.env.SECRET_KEY;
    if (!secret) {
      throw new Error("No secret key available");
    }

    const decoded = jwt.verify(token, secret) as { user_id: number };
    const { user_id } = decoded;
    const query = `SELECT * FROM users WHERE user_id = ?;`;
    connection.query(
      query,
      [user_id],
      (err, results: RowDataPacket[], fields) => {
        try {
          if (err) throw err;
          const user = results[0];
          res.send({ ok: true, user });
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
export const updateUserRole = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { user_id, role_id } = req.body;
    if (!user_id || !role_id) {
      throw new Error("Missing fields");
    }
    const query = "UPDATE users SET role_id = ? WHERE user_id = ?";
    connection.query(query, [role_id, user_id], (err, results, fields) => {
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

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const user_id = req.params.user_id;
    if (!user_id) {
      throw new Error("Missing fields");
    }
    // delete user address first
    const queryDeleteAddress = "DELETE FROM addresses WHERE user_id = ?";
    connection.query(queryDeleteAddress, [user_id], (err, results, fields) => {
      try {
        if (err) throw err;
        const query = "DELETE FROM users WHERE user_id = ?";
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
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ ok: false, error });
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const { user_id, password } = req.body;
    if (!user_id || !password) {
      res.status(400).send({ ok: false, error: "Missing user_id or password" });
      return;
    }

    // Hash the new password
    const hash = await bcrypt.hash(password, saltRounds);

    // Update the user's password in the database
    const query = `
      UPDATE users
      SET password = ?
      WHERE user_id = ?;
    `;
    connection.query(query, [hash, user_id], (err, results: any, fields) => {
      if (err) {
        console.error(err);
        res.status(500).send({ ok: false, error: "Failed to update password" });
        return;
      }

      // if (results.affectedRows === 0) {
      //   res.status(404).send({ ok: false, error: 'User not found or password unchanged' });
      //   return;
      // }

      res.send({ ok: true, results });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ ok: false, error: "Internal server error" });
  }
};
export const updateUserPassword = async (req: Request, res: Response) => {
  try {
    const { user_id, old_password, new_password } = req.body;
    if (!user_id || !old_password || !new_password) {
      res.status(400).send({ ok: false, error: "Missing fields" });
      return;
    }
    const query = `
      SELECT password
      FROM users
      WHERE user_id = ?;
    `;
    connection.query(query, [user_id], async (err, results: any, fields) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .send({ ok: false, error: "Failed to get user password" });
        return;
      }
      const user = results[0];
      if (!user) {
        res.status(404).send({ ok: false, error: "User not found" });
        return;
      }
      const passwordMatch = await bcrypt.compare(old_password, user.password);
      if (!passwordMatch) {
        res.status(401).send({ ok: false, error: "Invalid password" });
        return;
      }
      const hash = await bcrypt.hash(new_password, saltRounds);
      const query = `
        UPDATE users
        SET password = ?
        WHERE user_id = ?;
      `;
      connection.query(query, [hash, user_id], (err, results: any, fields) => {
        if (err) {
          console.error(err);
          res
            .status(500)
            .send({ ok: false, error: "Failed to update password" });
          return;
        }
        res.send({ ok: true, results });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ ok: false, error: "Internal server error" });
  }
};

export const updateUserDetails = async (req: Request, res: Response) => {
  try {
    const { user_id, first_name, last_name, phone_number, gender, birth_date } =
      req.body;
    if (
      !user_id ||
      !first_name ||
      !last_name ||
      !phone_number ||
      !gender ||
      !birth_date
    ) {
      res.status(400).send({ ok: false, error: "Missing fields" });
      return;
    }
    const query = `
      UPDATE users
      SET first_name = ?, last_name = ?, phone_number= ? , gender = ?, birth_date = ?
      WHERE user_id = ?;
      `;
    connection.query(
      query,
      [first_name, last_name, phone_number, gender, birth_date, user_id],
      (err, results: any, fields) => {
        if (err) {
          console.error(err);
          res
            .status(500)
            .send({ ok: false, error: "Failed to update user details" });
          return;
        }
        res.send({ ok: true, results });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send({ ok: false, error: "Internal server error" });
  }
};
