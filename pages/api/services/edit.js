import dbConnect from '../../../utils/dbConnect';
import Service from '../../../models/Service';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'PUT') {
    try {
      const { _id, ...updateData } = req.body;
      const service = await Service.findByIdAndUpdate(_id, updateData, {
        new: true,
        runValidators: true
      });
      
      if (!service) {
        return res.status(404).json({ success: false, message: 'Service not found' });
      }
      
      res.status(200).json({ success: true, data: service });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}