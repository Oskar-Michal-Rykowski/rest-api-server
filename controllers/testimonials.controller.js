const message = require('./message');
const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Testimonial.findOne().skip(rand);
    if (!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getOne = async (req, res) => {
  try {
    const conc = await Testimonial.findById(req.params.id);
    if (!conc) res.status(404).json({ message: 'Not found' });
    else res.json(conc);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.createOne = async (req, res) => {
  try {
    const { author, text } = req.body;
    const newTestimonial = new Testimonial({
      author,
      text,
    });
    await newTestimonial.save();
    res.json(message);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.changeOne = async (req, res) => {
  const { author, text } = req.body;
  try {
    const conc = await Testimonial.findById(req.params.id);
    if (conc) {
      await Testimonial.updateOne(
        { _id: req.params.id },
        {
          $set: {
            ...(author && { author }),
            ...(text && { text }),
          },
        }
      );
      res.json(message);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const conc = await Testimonial.findById(req.params.id);
    if (conc) {
      await Testimonial.deleteOne({ _id: req.params.id });
      res.json(message);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
