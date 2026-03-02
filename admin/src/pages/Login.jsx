import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { CheckIcon, Lock, MailIcon } from "lucide-react";
import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data));

      navigate("/admin/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="grid md:grid-cols-2 w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div
          className="hidden md:flex relative flex-col justify-between shrink-0 
   bg-slate-900 p-10 overflow-hidden text-white"
        >
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col h-full justify-center">
            <div className="hidden md:flex flex-col justify-center items-center text-white p-10">
              <h2 className="text-4xl font-bold mb-4">StackCart Admin</h2>
              <p className="text-gray-300 text-center">
                Manage products, users and orders easily from your dashboard.
              </p>
            </div>
          </div>
        </div>
        <div className="p-15">
          <h2 className="text-3xl font-bold mb-2">Sign In</h2>
          <p className="text-muted-foreground mb-8">
            Enter your credentials to access admin panel
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium">Email</label>
              <InputGroup className="mt-2">
                <InputGroupInput
                  type="email"
                  placeholder="admin@stackcart.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputGroupAddon>
                  <MailIcon size={18} />
                </InputGroupAddon>
              </InputGroup>
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <InputGroup className="relative mt-2">
                <InputGroupInput
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputGroupAddon>
                  <Lock size={18} />
                </InputGroupAddon>
                <InputGroupAddon
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <IoEyeOff size={18} /> : <IoEye size={18} />}
                </InputGroupAddon>
              </InputGroup>
            </div>
            <Button type="submit" className="w-full h-11 text-base cursor-pointer">
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
