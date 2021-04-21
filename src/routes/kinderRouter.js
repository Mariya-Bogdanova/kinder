import express from 'express';
import multer from 'multer';
import playSound from 'play-sound';
import { WaterModel, EarthModel, yourAnimalModel } from '../../db/models/theme.js';
import quickStart from '../../src/speech.js';

const player = playSound({});
const router = express.Router();
let audio;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/photo/yourAnimal')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
const upload = multer({ storage })

router.route('/')
  .get(async (req, res) => {
    try {
      const landAnimals = await EarthModel.find()
      const seaСreatures = await WaterModel.find()
      const yourAnimals = await yourAnimalModel.find()
      res.render('kinder', { landAnimals, seaСreatures, yourAnimals })
    } catch (err) {
      console.error(err.message);
    }
  })

  router.route('/animal')
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
      const newAnimal = await new yourAnimalModel({ title, description, img: path.substr(6), voiceFileName:`public/voice_acting/${title}.wav` }).save();
      res.redirect('/')
    } catch (err) {
      console.error(err.message);
    }
  })


  router.route('/voiceActing/stop')
  .get(async (req, res) => {
    try {
      audio?.kill()
      return;
    } catch (err) {
      console.error(err.message);
    }
  })

router.route('/voiceActing/:id')
  .get(async (req, res) => {
    try {
      const id = req.params.id;
      const animal = await EarthModel.findById(id) || await WaterModel.findById(id) || await yourAnimalModel.findById(id);
      audio?.kill()
      audio = player.play(animal.voiceFileName);
      return;
    } catch (err) {
      console.error(err.message);
    }
  })


export default router;
