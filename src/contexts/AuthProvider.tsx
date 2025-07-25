import React, {
	PropsWithChildren,
	useCallback,
	useEffect,
	useLayoutEffect,
	useState,
	createContext,
	useContext,
} from 'react';
import { loginType, signupType } from '../types/authType';
import axios from 'axios';

type authContextType = {
	signup: ({ signupData }: { signupData: signupType }) => Promise<void>;
	login: ({ loginData }: { loginData: loginType }) => Promise<void>;
	logout: () => Promise<void>;
	user: {
		id: string;
		name: string;
		email: string;
	};
	token: string | null;
};

const authContext = createContext<authContextType>({
	signup: async () => {},
	login: async () => {},
	logout: async () => {},
	user: {
		id: '',
		name: '',
		email: '',
	},
	token: null,
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
	const [token, setToken] = useState(null);
	const [user, setUser] = useState({ id: '', name: '', email: '' });

	// SIGNUP FUNCTION

	const signup = useCallback(async ({ signupData }: { signupData: signupType }) => {
		try {
			const response = await axios.post('/api/signup', signupData, { withCredentials: true });
			const data = await response.data;
			setToken(data.token);
			setUser(data.user);
		} catch (error) {
			console.error('Signup failed:', error);
		}
	}, []);

	// LOGIN FUNCTION

	const login = useCallback(async ({ loginData }: { loginData: loginType }) => {
		try {
			const response = await axios.post('/api/login', loginData, { withCredentials: true });
			const data = await response.data;
			setToken(data.token);
			setUser(data.user);
		} catch (error) {
			console.error('Login failed:', error);
			setToken(null);
			setUser({ id: '', name: '', email: '' });
		}
	}, []);

	// LOGOUT FUNCTION

	const logout = useCallback(async () => {
		try {
			const response = await axios.post('/api/logout', { withCredentials: true });

			setToken(null);
			setUser({ id: '', name: '', email: '' });
			console.log('Logout successful:', response.data);
		} catch (error) {
			console.error('Logout failed:', error);
		}
	}, []);

	// FETCH ACCESS TOKEN AND USER DATA - ON FIRST MOUNT

	useEffect(() => {
		const fetchAccessToken = async () => {
			try {
				const response = await axios.get('/api/get-token', { withCredentials: true });
				const data = await response.data;
				setToken(data.token);
				setUser(data.user);
			} catch (error) {
				console.error('Failed to fetch user data:', error);
				setToken(null);
			}
		};

		fetchAccessToken();
	}, []);

	// AXIOS INTERCEPTORS FOR ADD TOKEN TO REQUEST HEADERS

	useLayoutEffect(() => {
		const requestInterceptor = axios.interceptors.request.use((config) => {
			if (token) {
				config.headers.Authorization = token ? `Bearer ${token}` : config.headers.Authorization;
			}
			return config;
		});

		return () => {
			axios.interceptors.request.eject(requestInterceptor);
		};
	}, [token]);

	// AXIOS INTERCEPTORS FOR REFRESH TOKEN ON 401 ERROR

	useLayoutEffect(() => {
		const responseInterceptor = axios.interceptors.response.use(
			(response) => response,
			async (error) => {
				const originalRequest = error.config;

				if (error.response.status === 401) {
					try {
						const response = await axios.get('/api/refresh-token', { withCredentials: true });
						const data = await response.data;
						originalRequest.headers.Authorization = `Bearer ${data.token}`;

						return axios(originalRequest);
					} catch (error) {
						console.error('Failed to get refresh-token:', error);
						setToken(null);
					}
				}

				return Promise.reject(error);
			}
		);

		return () => {
			axios.interceptors.response.eject(responseInterceptor);
		};
	}, []);

	//USEMEMO - OPTIMIZE CONTEXT VALUE

	const contextValue = React.useMemo(() => {
		return {
			signup,
			login,
			logout,
			user,
			token,
		};
	}, [signup, login, logout, user, token]);

	///////////////////////////////////////////////////

	return <authContext.Provider value={contextValue}>{children}</authContext.Provider>;
};

export const useAuth = () => {
	return useContext(authContext);
};
