import dbConnect from '../../../utils/dbConnect';
import Service from '../../../models/Service';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const service = await Service.findById(id);
      if (!service) {
        return res.status(404).json({ success: false, message: 'Service not found' });
      }
      res.status(200).json(service);
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}