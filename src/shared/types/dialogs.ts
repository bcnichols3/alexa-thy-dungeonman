export type Dialog = {
  ssml: string;
  altText: string;
};

export type DialogMap = {
  [Key: string]: Dialog;
};
