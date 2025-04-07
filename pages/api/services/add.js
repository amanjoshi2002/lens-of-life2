import dbConnect from '../../../utils/dbConnect';
import Service from '../../../models/Service';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const service = await Service.create(req.body);
      res.status(201).json({ success: true, data: service });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}