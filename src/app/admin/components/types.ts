export interface Blog {
  _id: string;
  category: string;
  title: string;
  headPhotoLink: string;
  headPhotoLinks: string[];
  paragraphs: { heading: string; content: string }[];
  subPhotos: string[];
  photos: string[];
  videos: string[];
}

export interface FormState {
  category: string;
  title: string;
  headPhotoLink: string;
  headPhotoLinks: string[];
  paragraphs: { heading: string; content: string }[];
  subPhotos: string[];
  photos: string[];
  videos: string[];
}