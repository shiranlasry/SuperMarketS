import connection from "../../DB/database"; 
import express from 'express';

export const getAllDepartmentsStatus = async (req: express.Request, res: express.Response) => {
    try {
        const query = "SELECT * FROM  rami_levy_db.departments_status;"
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

export const getDepartmentStatusById = async (req: express.Request, res: express.Response) => {
    try {
        const { department_status_id } = req.params
        if (!department_status_id) {
            res.status(400).send({ ok: false, error: 'missing required fields' })
            return
        }
        const query = "SELECT * FROM  rami_levy_db.departments_status WHERE department_status_id = ?;"
        connection.query(query, [department_status_id], (err, results, fields) => {
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

export const addNewDepartmentStatus = async (req: express.Request, res: express.Response) => {  // only get status name 
    try {
        const { department_status_name } = req.body
        if (!department_status_name) {
            res.status(400).send({ ok: false, error: 'missing required fields' })
            return
        }
        const query = "INSERT INTO rami_levy_db.departments_status (department_status_name) VALUES (?);"
        connection.query(query, [department_status_name], (err, results, fields) => {
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

export const updateDepartmentStatus = async (req: express.Request, res: express.Response) => {
    try {
        const { department_status_id, department_status_name } = req.body
        if (!department_status_id || !department_status_name) {
            res.status(400).send({ ok: false, error: 'missing required fields' })
            return
        }
        const query = "UPDATE rami_levy_db.departments_status SET department_status_name = ? WHERE department_status_id = ?;"
        connection.query(query, [department_status_name, department_status_id], (err, results, fields) => {
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

export const deleteDepartmentStatus = async (req: express.Request, res: express.Response) => {
    try {
        const { department_status_id } = req.body
        if (!department_status_id) {
            res.status(400).send({ ok: false, error: 'missing required fields' })
            return
        }
        const query = "DELETE FROM rami_levy_db.departments_status WHERE department_status_id = ?;"
        connection.query(query, [department_status_id], (err, results, fields) => {
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


