import dbConnect from '../../../utils/dbConnect';
import FAQ from '../../../models/FAQ';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'PUT') {
    const { id, question, answer } = req.body;
    try {
      const faq = await FAQ.findByIdAndUpdate(
        id,
        { question, answer },
        { new: true }
      );
      if (!faq) {
        return res.status(404).json({ success: false, message: 'FAQ not found' });
      }
      res.status(200).json({ success: true, data: faq });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
} 