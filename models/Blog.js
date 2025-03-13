import mongoose from 'mongoose';

const { Schema } = mongoose;

const blogSchema = new Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  headPhotoLink: { type: String, required: true },
  date: { type: Date, default: Date.now },
  paragraphs: [{ type: String }],
  subPhotos: [{ type: String }]
});

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);