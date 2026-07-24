import express from 'express';
import { saveDate, getDates} from '../controllers/dateController.js';

const router = express.Router();

router.post('/addDate', saveDate)

router.get('/', getDates)

export default router;