import mongoose from 'mongoose';

const { Schema } = mongoose;

const blogSchema = new Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  headPhotoLink: { type: String, required: true }, // Keeping for backward compatibility
  headPhotoLinks: [{ type: String }], // New field for multiple head photos
  date: { type: Date, default: Date.now },

  // Add these two fields:
  coupleName: { type: String }, // Name of the couple
  weddingDate: { type: Date },  // Wedding date

  paragraphs: [{ 
    heading: { type: String },
    content: { type: String }
  }],
  subPhotos: [{ type: String }],
  photos: [{ type: String }],
  videos: [{ type: String }]
});

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);