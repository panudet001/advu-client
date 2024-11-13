export interface FaqsCategory {
  name: string;
  description: string;
  slug: string;
  icon: string;
}
export interface FaqsMostTopic {
  question: string;
  description: string;
  answer: string;
  slug: string;
  icon: string;
}
export interface FaqsCategoryDetail {
  question: string;
  description: string;
  answer: string;
  slug: string;
  icon: string;
}

export interface FaqDetail {
  question: string;
  description: string;
  answer: string;
  slug: string;
  icon: string;
  category: FaqsCategory;
  relateFaqs: ContentInterface[];
}
export interface ContentInterface {
  question: string;
  description: string;
  answer: string;
  slug: string;
  icon: string;
  relateFaqs: ContentInterface[];
}

export interface SearchResult {
  id: string;
  category: string;
  icon: string;
  title: string;
  description: string;
}
