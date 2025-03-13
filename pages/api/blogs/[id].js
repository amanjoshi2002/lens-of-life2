import dbConnect from '../../../utils/dbConnect';
import Blog from '../../../models/Blog';

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const blog = await Blog.findById(id);
      if (!blog) {
        return res.status(404).json({ success: false, message: 'Blog not found' });
      }
      res.status(200).json(blog);
    } catch (error) {
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
} 