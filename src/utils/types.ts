import { Session, User } from "@supabase/supabase-js";
import { Dispatch, SetStateAction } from "react";
export type Token = {
  user: User | null;
  session: Session | null;
};

export type MyUser = {
  username: string;
  name: string;
  image: string;
};

export type Reply = {
  content: string;
  replyingTo: string;
  user: MyUser;
};

export type Comment = {
  id: number;
  product_id: number;
  content: string;
  user: MyUser;
  replies?: Reply[];
};

export type ProductReq = {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  upvoted: boolean;
  status: string;
  description: string;
  comments?: Comment[];
};

export type Roadmap = { status: string; count: number };

export type LogInProps = {
  setToken: Dispatch<SetStateAction<Token | null>>;
};
