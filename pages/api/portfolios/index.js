import dbConnect from '../../../utils/dbConnect';
import Portfolio from '../../../models/Portfolio';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const portfolios = await Portfolio.find({})
        .populate('category', 'name')
        .populate('subcategory', 'name');
      res.status(200).json(portfolios);
    } catch (error) {
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
} 