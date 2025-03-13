import dbConnect from '../../../utils/dbConnect';
import Blog from '../../../models/Blog';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'DELETE') {
    try {
      const { id } = req.body;
      const deletedBlog = await Blog.findByIdAndDelete(id);
      if (!deletedBlog) {
        return res.status(404).json({ success: false, message: 'Blog not found' });
      }
      res.status(200).json({ success: true, data: deletedBlog });
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}