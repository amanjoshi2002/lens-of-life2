import dbConnect from '../../../utils/dbConnect';
import Subcategory from '../../../models/Subcategory';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const subcategory = new Subcategory(req.body);
      await subcategory.save();
      res.status(201).json({ success: true, data: subcategory });
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
} 