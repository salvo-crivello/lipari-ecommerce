interface userType {
	id: string;
	name: string;
	email: string;
	password: string;
}

export type signupType = Omit<userType, 'id'>;

export type loginType = Omit<userType, 'id' | 'name'>;
