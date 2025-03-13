import dbConnect from '../../../utils/dbConnect';
import Category from '../../../models/Category';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const category = new Category(req.body);
      await category.save();
      res.status(201).json({ success: true, data: category });
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
} 