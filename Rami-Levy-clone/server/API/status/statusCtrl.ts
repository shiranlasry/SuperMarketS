import connection from "../../DB/database"; 
import express from 'express';

//in DB: status_id, department_status_id, department_status_name

export const getAllStatuses = async (req: express.Request, res: express.Response) => {
    try {
        const query = "SELECT * FROM  rami_levy_db.status;"
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

export const getStatusById = async (req: express.Request, res: express.Response) => {
    try {
        const { status_id } = req.params
        if (!status_id) {
            res.status(400).send({ ok: false, error: 'missing required fields' })
            return
        }
        const query = "SELECT * FROM  rami_levy_db.status WHERE status_id = ?;"
        connection.query(query, [status_id], (err, results, fields) => {
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

export const addNewStatus = async (req: express.Request, res: express.Response) => {
    try {
        const { department_status_id, department_status_name } = req.body
        if (!department_status_id || !department_status_name) {
            res.status(400).send({ ok: false, error: 'missing required fields' })
            return
        }
        const query = "INSERT INTO rami_levy_db.status (department_status_id, department_status_name) VALUES (?, ?);"
        connection.query(query, [department_status_id, department_status_name], (err, results, fields) => {
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

export const updateStatus = async (req: express.Request, res: express.Response) => {
    try {
        const { status_id, department_status_id, department_status_name } = req.body
        if (!status_id || !department_status_id || !department_status_name) {
            res.status(400).send({ ok: false, error: 'missing required fields' })
            return
        }
        const query = "UPDATE rami_levy_db.status SET department_status_id = ?, department_status_name = ? WHERE status_id = ?;"
        connection.query(query, [department_status_id, department_status_name, status_id], (err, results, fields) => {
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

export const deleteStatus = async (req: express.Request, res: express.Response) => {
    try {
        const { status_id } = req.params
        if (!status_id) {
            res.status(400).send({ ok: false, error: 'missing required fields' })
            return
        }
        const query = "DELETE FROM rami_levy_db.status WHERE status_id = ?;"
        connection.query(query, [status_id], (err, results, fields) => {
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