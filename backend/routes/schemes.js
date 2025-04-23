const express = require('express');
const router = express.Router();
const Scheme = require('../models/scheme');
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/admin');

// POST /api/schemes/add (Admin only)
router.post('/add', auth, adminOnly, async (req, res) => {
  try {
    const {
      title,
      description,
      type,
      link,
      category,
      region,
      benefits,
      state,
      gender,
      ageRange,
      caste,
      ministry,
      residence,
      minority,
      differentlyAbled,
      dbt,
      disabilityPercentage
    } = req.body;
    
    const newScheme = new Scheme({
      title,
      description,
      type,
      link,
      category: category || 'all',
      region: region || 'all',
      benefits: benefits || 'all',
      state: state || 'all',
      gender: gender || 'all',
      ageRange: ageRange || 'all',
      caste: caste || 'all',
      ministry: ministry || 'all',
      residence: residence || 'all',
      minority: minority || 'all',
      differentlyAbled: differentlyAbled || 'all',
      dbt: dbt || 'all',
      disabilityPercentage: disabilityPercentage || 'all'
    });
    
    await newScheme.save();
    res.status(201).json({ message: 'Scheme added successfully', scheme: newScheme });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all schemes (Admin-only; may be modified to be public if needed)
router.get('/', auth, adminOnly, async (req, res) => {
  try {
    const schemes = await Scheme.find();
    res.json(schemes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/schemes/:id (Admin-only)
router.put('/:id', auth, adminOnly, async (req, res) => {
  try {
    const updatedScheme = await Scheme.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedScheme) return res.status(404).json({ msg: 'Scheme not found' });
    res.json({ message: 'Scheme updated', scheme: updatedScheme });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/schemes/:id (Admin-only)
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    const deletedScheme = await Scheme.findByIdAndDelete(req.params.id);
    if (!deletedScheme) return res.status(404).json({ msg: 'Scheme not found' });
    res.json({ message: 'Scheme deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Public: get only government schemes
router.get('/government', async (req, res) => {
  try {
    const gov = await Scheme.find({ type: 'government' }).sort({ createdAt: -1 });
    res.json(gov);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching government schemes' });
  }
}); 


// 👉 NEW: GET /api/schemes/private
router.get('/private', async (req, res) => {
  try {
    const priv = await Scheme.find({ type: 'private' }).sort({ createdAt: -1 });
    res.json(priv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching private schemes' });
  }
});



module.exports = router;
