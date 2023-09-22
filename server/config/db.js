const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/decode', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Failed to connect to MongoDB', error);
});
