export type LinkedinTokenType = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
};

export type LinkedinProfileType = {
  sub: string;
  name: string;
  email: string;
  picture: string;
  given_name: string;
  family_name: string;
  locale: string;
};
