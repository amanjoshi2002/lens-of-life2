import dbConnect from '../../../utils/dbConnect';
import Portfolio from '../../../models/Portfolio';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const portfolio = new Portfolio(req.body);
      await portfolio.save();
      res.status(201).json({ success: true, data: portfolio });
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
} 