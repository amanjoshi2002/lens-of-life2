import dbConnect from '../../../utils/dbConnect';
import BlogNew from '../../../models/BlogNew';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const blogs = await BlogNew.find({}).sort({ date: -1 });
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const blog = await BlogNew.create(req.body);
      res.status(201).json({ success: true, data: blog });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}