import dbConnect from '../../../utils/dbConnect';
import Category from '../../../models/Category';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'PUT') {
    const { id, name } = req.body;
    if (!id || !name) {
      return res.status(400).json({ success: false, message: 'ID and name are required' });
    }
    try {
      const category = await Category.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      );
      if (!category) {
        return res.status(404).json({ success: false, message: 'Category not found' });
      }
      res.status(200).json({ success: true, data: category });
    } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
} 