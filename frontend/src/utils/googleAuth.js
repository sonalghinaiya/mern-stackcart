import { useGoogleLogin } from "@react-oauth/google";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export const useGoogleAuth = () => {
  const navigate = useNavigate();
  const googleLogin = useGoogleLogin({
    flow: "implicit",
    onSuccess: async (tokenResponse) => {
      try {
        const res = await api.post("/auth/social-login", {
          access_token: tokenResponse.access_token,
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data));
        navigate("/profile");
      } catch (error) {
        console.log(error);
      }
    },
    onError: () => console.log("Login Failed"),
  });
  return googleLogin;
};
