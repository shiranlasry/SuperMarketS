
import express from 'express';
export const addNewProductImages = async (req: express.Request, res: express.Response) => { 
    try {
        const files = req.files as { [fieldname: string]: Express.Multer.File[] }
        if (!files) {
          res.status(400).send({ ok: false, error: 'no files were uploaded.' })
          return
        }
        const { product_id } = req.body;
        console.log('product_id', product_id)
        console.log('files', files)
    } catch (error) {
      console.error(error)
      res.status(500).send({ ok: false, error })
    }
    }