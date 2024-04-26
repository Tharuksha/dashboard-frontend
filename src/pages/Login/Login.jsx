/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { instance } from "../../services/AxiosOrder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setError] = useState("");

  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  document.title = 'Login';

  const LoginAction = (event) => {
    event.preventDefault();
    instance
      .post("/signin", { email, password })
      .then((response) => {
        const token = response.data.token;
        const role = response.data.role;
        const firstname = response.data.firstname;
        const userid = response.data.userid;
        console.log(response);
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("firstname", firstname);
        localStorage.setItem("userid", userid);

        // Early return end if the token is not valid
        if (token === undefined) {
          setError("Invalid login credentials. Please try again.");
          return;
        }

        if (role === "admin") {
          navigate("/admin");
        } else {
          // Construct the URL with query parameters to pass data
        const url = `https://home.tharuksha.com/?userid=${userid}&firstname=${firstname}`;
        // Redirect to the new URL
        window.location.href = url;
          // navigate("/user");
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Invalid login credentials. Please try again.");
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[390px]">
        <CardHeader>
          <h2 className="flex justify-center items-center text-4xl font-semibold">
            Login
          </h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={LoginAction}>
            <div className="grid gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-lg"
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>
              {loginError && <div className="text-red-500">{loginError}</div>}
              <Button type="submit">Login</Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <CardDescription>
            Don't have an account?{" "}
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
