interface userType {
  id: string;
  username: string;
  email: string;
  password: string;
}

export type signupType = Omit<userType, "id">;

export type loginType = {
  username: string;
  password: string;
  expiresInMins?: number;
};
