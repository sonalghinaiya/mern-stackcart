import { useGoogleLogin } from "@react-oauth/google";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const useGoogleAuth = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const googleLogin = useGoogleLogin({
    flow: "implicit",
    onSuccess: async (tokenResponse) => {
      try {
        const res = await api.post("/auth/social-login", {
          access_token: tokenResponse.access_token,
        });

        login(res.data.data, res.data.token);

        navigate("/");
      } catch (error) {
        console.log(error);
      }
    },
    onError: () => console.log("Login Failed"),
  });
  return googleLogin;
};
