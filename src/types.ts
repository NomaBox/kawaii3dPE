export interface Pet {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  isBestSeller?: boolean;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}
