export type ProfileRow = {
  id: string;
  user_id: string;
  username: string;
  name: string;
  gender: string;
  phone: string;
  birth_date: string;
  agreement_checked: boolean;
  created_at: string;
};

export type CommunityPostRow = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  author_name: string;
  created_at: string;
};

export type ReviewRow = {
  id: string;
  title: string;
  summary: string | null;
  content: string;
  author_name: string;
  image_url: string | null;
  image_path: string | null;
  created_at: string;
  is_published: boolean;
};

export type InquiryRow = {
  id: string;
  name: string;
  phone: string;
  content: string;
  created_at: string;
};

export type ExternalLinkRow = {
  id: string;
  title: string;
  description: string | null;
  href: string;
  sort_order: number;
  created_at: string;
};

export type ExternalChannelPlaceholder = {
  id: string;
  title: string;
  description: string;
  href: string;
  sort_order: number;
};
