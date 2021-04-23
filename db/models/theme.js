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
  voiceFileName: String,
  dateOfCreation: Date,
});


export default mongoose.model('yourAnimals', ThemeSchema)



