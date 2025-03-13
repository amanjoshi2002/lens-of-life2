import dbConnect from '../../../utils/dbConnect';
import Subcategory from '../../../models/Subcategory';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'DELETE') {
    try {
      const { id } = req.body;
      const deletedSubcategory = await Subcategory.findByIdAndDelete(id);
      if (!deletedSubcategory) {
        return res.status(404).json({ success: false, message: 'Subcategory not found' });
      }
      res.status(200).json({ success: true, data: deletedSubcategory });
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
} 