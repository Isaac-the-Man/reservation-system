const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const exportable = require('@lykmapipo/mongoose-exportable');
const TimeSlot = require('../models/timeslot');


const recordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    exportable: true
  },
  email: {
    type: String,
    required:true,
    exportable: true
  },
  phone: {
    type: String,
    required: true,
    exportable: true
  },
  city: {
    type: String,
    required: true,
    exportable: true
  },
  childName :{
    type: String,
    required: true,
    exportable: true
  },
  childGrade :{
    type: String,
    required: true,
    exportable: true
  },
  childNation :{
    type: String,
    required: true,
    exportable: true
  },
  timeslot: {
    type: TimeSlot.Schema,
    required: true,
    exportable: true
  },
  completion: {
    type: Date,
    required: false,
    exportable: true
  }
});
recordSchema.plugin(mongoosePaginate);
recordSchema.plugin(exportable);
const Record = mongoose.model('records', recordSchema);

// utils
// date formatter
function formatDateRange(m1, m2) {
  if (m1.isSame(m2, 'day')) {
    return `${m1.format('dddd, MMMM Do, H:mm')} ~ ${m2.format('H:mm')}`;
  } else {
    return `${m1.format('dddd, MMMM Do, H:mm')} ~ ${m2.format('dddd, MMMM Do, H:mm')}`;
  }
}

// export
module.exports = {
  Model: Record,
  formatDateRange: formatDateRange
}
