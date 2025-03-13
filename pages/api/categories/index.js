import dbConnect from '../../../utils/dbConnect';
import Category from '../../../models/Category';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const categories = await Category.find({});
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
} 