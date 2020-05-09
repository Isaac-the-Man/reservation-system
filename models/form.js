const mongoose = require('mongoose');


const formSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required:true
  },
  isDisabled: {
    type: Boolean,
    required: true
  }
});
const Form = mongoose.model('forms', formSchema);

// export
module.exports = {
  Model: Form
}
