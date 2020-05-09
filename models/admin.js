const mongoose = require('mongoose');


const adminSchema = new mongoose.Schema({
  account: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required:true
  }
});
const Admin = mongoose.model('admins', adminSchema);

// export
module.exports = {
  Model: Admin
}
