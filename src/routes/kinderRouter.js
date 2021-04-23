import express from 'express';
import yourAnimalsModel from '../../db/models/theme.js';

const router = express.Router();

router.route('/children')
  .get(async (req, res) => {
    try {
      const yourAnimals = await yourAnimalsModel.find().sort({ dateOfCreation: -1 })
      const children = true;
      res.render('kinder', { yourAnimals, children })
    } catch (err) {
      console.error(err.message);
    }
  })

router.route('/parents')
  .get(async (req, res) => {
    try {
      const yourAnimals = await yourAnimalsModel.find().sort({ dateOfCreation: -1 })
      const parents = true;
      res.render('kinder', { yourAnimals, parents })
    } catch (err) {
      console.error(err.message);
    }
  })

export default router;
