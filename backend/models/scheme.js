const mongoose = require('mongoose');

const SchemeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String, enum: ['government', 'private'], required: true },
  link: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now },
  // Extra filter fields (optional, default to 'all' if not provided)
  category: { type: String, default: 'all' },
  region: { type: String, default: 'all' },
  benefits: { type: String, default: 'all' },
  state: { type: String, default: 'all' },
  gender: { type: String, default: 'all' },
  ageRange: { type: String, default: 'all' },
  caste: { type: String, default: 'all' },
  ministry: { type: String, default: 'all' },
  residence: { type: String, default: 'all' },
  minority: { type: String, default: 'all' },
  differentlyAbled: { type: String, default: 'all' },
  dbt: { type: String, default: 'all' },
  disabilityPercentage: { type: String, default: 'all' }
});

module.exports = mongoose.model('Scheme', SchemeSchema);
