import mongoose from 'mongoose';

mongoose.set('useFindAndModify', false);
export default mongoose.connect('mongodb://localhost:27017/znaika', { useNewUrlParser: true, useUnifiedTopology: true });
