import dbConnect from '../../../utils/dbConnect';
import FAQ from '../../../models/FAQ';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'DELETE') {
    try {
      const { id } = req.body;
      const deletedFAQ = await FAQ.findByIdAndDelete(id);
      if (!deletedFAQ) {
        return res.status(404).json({ success: false, message: 'FAQ not found' });
      }
      res.status(200).json({ success: true, data: deletedFAQ });
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
} 