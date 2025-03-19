import dbConnect from '../../../utils/dbConnect';
import Testimonial from '../../../models/Testimonial';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
        res.status(200).json(testimonials);
      } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
      }
      break;

    case 'POST':
      try {
        const testimonial = new Testimonial(req.body);
        await testimonial.save();
        res.status(201).json({ success: true, data: testimonial });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}