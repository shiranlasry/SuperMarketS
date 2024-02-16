import exp from "constants";
import connection from "../../DB/database";
import express from 'express';

interface NavBarItem{
    navbar_item_id : number;
    label: string;
    icon_src : string;
    active_icon_src : string;
    to : string;
  }
  
export const getAllNavBarItems = async (req: express.Request, res: express.Response) => {
    try {
  
    const query = "SELECT * FROM  rami_levy_db.navbar_items;"
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
  
