export interface Email {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  date: string;
  initial: string;
  avatarColor: string;
  isUnread: boolean;
  category: string;
}

export interface ComposeEmailInput {
  subject: string;
  body: string;
}
