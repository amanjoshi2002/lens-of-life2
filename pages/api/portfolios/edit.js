import dbConnect from '../../../utils/dbConnect';
import Portfolio from '../../../models/Portfolio';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'PUT') {
    const { _id, title, category, subcategory, photos } = req.body;
    try {
      const portfolio = await Portfolio.findByIdAndUpdate(
        _id,
        { title, category, subcategory, photos },
        { new: true }
      );
      if (!portfolio) {
        return res.status(404).json({ success: false, message: 'Portfolio not found' });
      }
      res.status(200).json(portfolio);
    } catch (error) {
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
} 