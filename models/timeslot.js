const mongoose = require('mongoose');


const timeSchema = new mongoose.Schema({
  startDateTime: {
    type: Date,
    required: true
  },
  endDateTime: {
    type: Date,
    required: true
  }
});
const TimeSlot = mongoose.model('timeslots', timeSchema);

// export
module.exports = {
  Model: TimeSlot,
  Schema: timeSchema
}
