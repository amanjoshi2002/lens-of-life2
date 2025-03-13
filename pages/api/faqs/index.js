import dbConnect from '../../../utils/dbConnect';
import FAQ from '../../../models/FAQ';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const faqs = await FAQ.find({});
      res.status(200).json(faqs);
    } catch (error) {
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
} 