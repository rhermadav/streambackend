const express = require('express');
const router = express.Router();

let Stream = require('../models/stream.model');

router.get('/', async (req, res) => {
  const stream = await Stream.find()
  if(!stream) return res.status(400).json('there is no stream');
  res.json(stream);
});

router.get('/:id',  async (req, res) => {
  const stream = await Stream.findById(req.params.id);

  if (!stream) return res.status(404).json('The stream with the given ID was not found.');

  res.json(stream);
});

router.post('/',  async (req, res) => {
  let stream = new Stream({ title: req.body.title, description: req.body.description , userId :req.body.userId});

    stream = await stream.save();
    if(!stream ) return  res.status(400).json('could not send stream');
    res.status(200).json(stream);
});

router.put('/:id', async (req, res) => {
  const stream = await Stream.findByIdAndUpdate(req.params.id, { title: req.body.title, description: req.body.description }, {
    new: true
  });

  if (!stream) return res.status(404).json('The stream with the given ID was not found.');
  
  res.json(stream);
});

router.delete('/:id', async (req, res) => {
  const stream = await Stream.findByIdAndRemove(req.params.id);

  if (!stream) return res.status(404).json('The stream with the given ID was not found.');

  res.json(stream);
});



module.exports = router;