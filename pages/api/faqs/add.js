import dbConnect from '../../../utils/dbConnect';
import FAQ from '../../../models/FAQ';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const faq = new FAQ(req.body);
      await faq.save();
      res.status(201).json({ success: true, data: faq });
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
} 