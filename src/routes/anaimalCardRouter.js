import express from 'express';
import multer from 'multer';
import yourAnimalsModel from '../../db/models/theme.js';
import quickStart from '../speech.js';

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/photo')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
const upload = multer({ storage })

router.route('/')
  //форма создания нового артикля
  .get(async (req, res) => {
    try {
      res.render('newAnimal')
    } catch (err) {
      console.error(err.message);
    }
  })
  // принять созданный новый артикль
  .post(upload.single('img'), async (req, res, next) => {
    try {
      const { path } = req.file;
      const { title, description } = req.body;
      quickStart(description, title)
      const newAnimal = await new yourAnimalsModel({ title, description, img: path.substr(6), voiceFileName: `public/voice_acting/${title}.wav`, dateOfCreation: new Date() }).save();
      res.redirect('/parents')
    } catch (err) {
      console.error(err.message);
    }
  })

router.route('/:id')
  // форма для изменения артикля
  .get(async (req, res) => {
    try {
      const animal = await yourAnimalsModel.findById(req.params.id)
      res.render('updateAnimal', {animal})
    } catch (err) {
      console.error(err.message);
    }
  })
   // принять измененный артикль
   .put(upload.single('img'), async (req, res) => {
    try {
      const { title, description} = req.body;
      quickStart(description, title)
      await yourAnimalsModel.findByIdAndUpdate(req.params.id, { title, description,  voiceFileName: `public/voice_acting/${title}.wav`, dateOfCreation: new Date()})
      if (req.file) {
        const { path } = req.file;
        await yourAnimalsModel.findByIdAndUpdate(req.params.id, { img: path.substr(6), })
      }
      res.json('ок')
    } catch (err) {
      console.error(err.message);
    }
  })
  // удалить артикль
  .delete(async (req, res) => {
    try {
      await yourAnimalsModel.findByIdAndDelete(req.params.id)
      res.json('ок')
    } catch (err) {
      console.error(err.message);
    }
  })

export default router;
