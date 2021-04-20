import express from 'express';
import { WaterModel, EarthModel } from '../../db/models/theme.js';

const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    try {
      const landAnimals = await EarthModel.find()
      const seaСreatures = await WaterModel.find()
      res.render('kinder', {landAnimals, seaСreatures })
    } catch (err) {
      console.error(err.message);
    }
  })

export default router;
