const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true, minlength: 3, maxlength: 40 },
    text: { type: String, required: true, minlength: 3, maxlength: 200 },
    imageName: { type: String, required: false, minlength: 3, maxlength: 100 },
  },
  { versionKey: false }
);

module.exports = mongoose.model('Todo', schema);
