import dbConnect from '../../../utils/dbConnect';
import Blog from '../../../models/Blog';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const blog = new Blog(req.body);
      await blog.save();
      res.status(201).json({ success: true, data: blog });
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}