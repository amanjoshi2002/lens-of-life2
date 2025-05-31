import mongoose from 'mongoose';

const { Schema } = mongoose;

const blogSchema = new Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  headPhotoLink: { type: String, required: true },
  headPhotoLinks: [{ type: String }],
  date: { type: Date, default: Date.now },
  coupleName: { type: String },
  weddingDate: { type: Date },
  location: { type: String }, // <-- Added location field
  paragraphs: [{ 
    heading: { type: String },
    content: { type: String }
  }],
  subPhotos: [{ type: String }],
  photos: [{ type: String }],
  videos: [{ type: String }]
});

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);