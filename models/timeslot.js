const mongoose = require('mongoose');


const timeSchema = new mongoose.Schema({
  startDateTime: {
    type: String,
    required: true,
    default: Date.now
  },
  endDateTime: {
    type: String,
    required: true,
    default: Date.now
  }
});
const TimeSlot = mongoose.model('timeslots', timeSchema);

// export
module.exports = {
  Model: TimeSlot,
  Schema: timeSchema
}
