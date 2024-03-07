import express from 'express';
import { isAdmin } from '../middlewares/authMiddleware';

import { getAllSales, getSaleById, addNewSale, updateSale, deleteSale } from './salesCtrl';

const router = express.Router();

router
    .get('', isAdmin, getAllSales)
    .get('/:sale_id', isAdmin, getSaleById)
    .post('/add-new-sale', isAdmin, addNewSale)
    .put('/update-sale/:sale_id', isAdmin, updateSale)
    .delete('/delete-sale/:sale_id', isAdmin, deleteSale);

export default router;  

