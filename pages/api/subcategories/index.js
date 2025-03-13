import dbConnect from '../../../utils/dbConnect';
import Subcategory from '../../../models/Subcategory';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const subcategories = await Subcategory.find({}).populate('category', 'name');
      res.status(200).json(subcategories);
    } catch (error) {
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
} 