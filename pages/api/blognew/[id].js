import dbConnect from '../../../utils/dbConnect';
import BlogNew from '../../../models/BlogNew';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        const blog = await BlogNew.findById(id);
        if (!blog) {
          return res.status(404).json({ success: false, message: 'Blog not found' });
        }
        res.status(200).json(blog);
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'PUT':
      try {
        const blog = await BlogNew.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });
        if (!blog) {
          return res.status(404).json({ success: false, message: 'Blog not found' });
        }
        res.status(200).json({ success: true, data: blog });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'DELETE':
      try {
        const blog = await BlogNew.findByIdAndDelete(id);
        if (!blog) {
          return res.status(404).json({ success: false, message: 'Blog not found' });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}