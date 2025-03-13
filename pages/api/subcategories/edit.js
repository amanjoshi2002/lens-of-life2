import dbConnect from '../../../utils/dbConnect';
import Subcategory from '../../../models/Subcategory';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'PUT') {
    const { _id, name, category } = req.body;
    try {
      const subcategory = await Subcategory.findByIdAndUpdate(
        _id,
        { name, category },
        { new: true }
      );
      if (!subcategory) {
        return res.status(404).json({ success: false, message: 'Subcategory not found' });
      }
      res.status(200).json(subcategory);
    } catch (error) {
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
} 