import dbConnect from '../../../utils/dbConnect';
import Testimonial from '../../../models/Testimonial';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  switch (req.method) {
    case 'PUT':
      try {
        const testimonial = await Testimonial.findByIdAndUpdate(
          id,
          req.body,
          { new: true, runValidators: true }
        );
        if (!testimonial) {
          return res.status(404).json({ success: false, message: 'Testimonial not found' });
        }
        res.status(200).json({ success: true, data: testimonial });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    case 'DELETE':
      try {
        const testimonial = await Testimonial.findByIdAndDelete(id);
        if (!testimonial) {
          return res.status(404).json({ success: false, message: 'Testimonial not found' });
        }
        res.status(200).json({ success: true, data: testimonial });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}