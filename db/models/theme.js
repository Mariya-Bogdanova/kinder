import mongoose from 'mongoose';
mongoose.pluralize(null);

const ThemeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: String,
  voiceFileName: String
});


export const EarthModel = new mongoose.model('earthly_world', ThemeSchema)
export const WaterModel = new mongoose.model('underwater_world', ThemeSchema)
export const yourAnimalModel = new mongoose.model('yourAnimal', ThemeSchema)


