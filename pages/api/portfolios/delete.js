import dbConnect from '../../../utils/dbConnect';
import Portfolio from '../../../models/Portfolio';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'DELETE') {
    try {
      const { id } = req.body;
      const deletedPortfolio = await Portfolio.findByIdAndDelete(id);
      if (!deletedPortfolio) {
        return res.status(404).json({ success: false, message: 'Portfolio not found' });
      }
      res.status(200).json({ success: true, data: deletedPortfolio });
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
} 