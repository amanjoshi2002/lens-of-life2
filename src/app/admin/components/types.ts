export interface Paragraph {
  heading: string;
  content: string;
}

export interface Blog {
  _id: string;
  category: string;
  title: string;
  headPhotoLink: string;
  headPhotoLinks: string[];
  coupleName?: string;
  weddingDate?: string;
  location?: string; // <-- Added location field
  paragraphs: Paragraph[];
  subPhotos: string[];
  photos: string[];
  videos: string[];
}

export interface FormState {
  category: string;
  title: string;
  headPhotoLink: string;
  headPhotoLinks: string[];
  coupleName?: string;
  weddingDate?: string;
  location?: string; // <-- Added location field
  paragraphs: Paragraph[];
  subPhotos: string[];
  photos: string[];
  videos: string[];
}