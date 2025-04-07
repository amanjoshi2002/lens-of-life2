import mongoose from 'mongoose';

const { Schema } = mongoose;

const serviceSchema = new Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  headPhotoLink: { type: String, required: true },
  date: { type: Date, default: Date.now },
  paragraphs: [{ 
    heading: { type: String },
    content: { type: String }
  }],
  subPhotos: [{ type: String }],
  photos: [{ type: String }],
  videos: [{ type: String }]
}, {
  timestamps: true
});

export default mongoose.models.Service || mongoose.model('Service', serviceSchema);