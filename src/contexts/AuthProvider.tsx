"use clients";
import axios from "axios";
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { loginType, signupType } from "../types/authType";

export type User = {
  id: number | string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  image: string;
  gender: string;
};

type authContextType = {
  signup: (signupData: signupType) => Promise<void>;
  login: (loginData: loginType) => Promise<void>;
  logout: () => Promise<void>;
  fetchAccessToken: () => Promise<void>;
  user: User | null;
  token: string | null;
};

const authContext = createContext<authContextType>({
  signup: async () => {},
  login: async () => {},
  logout: async () => {},
  fetchAccessToken: async () => {},
  user: null,
  token: null,
});

////////////////////

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const isRetryRef = useRef(false);

  // SIGNUP FUNCTION

  const signup = useCallback(async (signupData: signupType) => {
    try {
      const response = await axios.post("/api/auth/signup", signupData, {
        withCredentials: true,
      });
      const data = await response.data;
      setToken(data.accessToken);
      setUser(data.user);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  }, []);

  // LOGIN FUNCTION

  const login = useCallback(async (loginData: loginType) => {
    if (loginData.username || loginData.password) return;
    try {
      const response = await axios.post("api/auth/login", loginData, {
        withCredentials: true,
      });
      const data = await response.data;
      const { accessToken, refreshToken, ...userData } = data;
      setUser(userData);
      setToken(accessToken);
      console.log("Login successful:", data);
    } catch (error) {
      console.error("Login failed:", error);
      setToken(null);
      setUser(null);
    }
  }, []);

  // LOGOUT FUNCTION

  const logout = useCallback(async () => {
    // try {
    //   const response = await axios.post("/api/auth/logout", {
    //     withCredentials: true,
    //   });

    //   setToken(null);
    //   setUser(null);
    //   console.log("Logout successful:", response.data);
    // } catch (error) {
    //   console.error("Logout failed:", error);
    // }

    setToken(null);
    setUser(null);
  }, []);

  // FETCH USER DATA FUNCTION

  const fetchAccessToken = useCallback(async () => {
    try {
      const response = await axios.get("api/auth/me", {
        withCredentials: true,
      });
      const data = await response.data;
      console.log("useEffect - Fetched user data:", data);
      const { accessToken, refreshToken, ...userData } = data;
      setUser(userData);
      setToken(accessToken);
    } catch (error) {
      console.log("useEffect - Failed login: ", error);
      setToken(null);
    }
  }, []);

  // FETCH ACCESS TOKEN AND USER DATA - ON FIRST MOUNT

  useEffect(() => {
    console.log("useEffect start");
    fetchAccessToken();
  }, []);

  // AXIOS INTERCEPTORS FOR ADD TOKEN TO REQUEST HEADERS

  useLayoutEffect(() => {
    console.log("request interceptor");
    const requestInterceptor = axios.interceptors.request.use((config) => {
      if (token && !isRetryRef.current) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("Token added:", config.headers.Authorization);
      } else {
        console.log("No token added:", config.headers.Authorization);
      }

      return config;
    });

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, [token]);

  // AXIOS INTERCEPTORS FOR REFRESH TOKEN ON 401 ERROR

  useLayoutEffect(() => {
    console.log("response interceptor");
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !isRetryRef.current) {
          isRetryRef.current = true;
          try {
            const response = await axios.get("api/auth/refresh", {
              withCredentials: true,
            });
            const data = await response.data;
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            return axios(originalRequest);
          } catch (error) {
            console.log("refresh-token failed: ", error);
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
      fetchAccessToken,
    };
  }, [signup, login, logout, user, token, fetchAccessToken]);

  ///////////////////////////////////////////////////

  return (
    <authContext.Provider value={contextValue}>{children}</authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};
