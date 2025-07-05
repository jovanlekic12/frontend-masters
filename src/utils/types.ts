export type ProductReq = {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  upvoted: boolean;
  status: string;
  description: string;
};

export type Comment = {
  id: number;
  product_id: number;
  content: string;
  username: string;
};

export type Reply = {
  id: string;
  comment: number;
  username: string;
  content: string;
  replyingTo: string;
};

export type User = {
  username: string;
  name: string;
  image: string;
};
