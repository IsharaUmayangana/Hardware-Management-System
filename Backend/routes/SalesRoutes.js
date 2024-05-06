import express from 'express';
import { createSale, getAllSales, deleteSale, updateSale, getOneSale } from '../controllers/SalesController.js';

const salesRouter = express.Router();

salesRouter.post('/', createSale);
salesRouter.get('/', getAllSales);
salesRouter.get('/:id', getOneSale);
salesRouter.delete('/:id', deleteSale);
salesRouter.put('/:id', updateSale);

export default salesRouter;
