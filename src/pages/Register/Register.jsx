import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../../services/AxiosOrder";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  document.title = 'Sign Up';

  const registerUser = async (event) => {
    event.preventDefault();
    try {
      const response = await instance.post("/signup", {
        email,
        password,
        firstname,
        lastname,
        role: "user",
      });
      console.log(response);

      if (response.data.statusCode != 400) {
        navigate("/login");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[390px]">
        <CardHeader>
          <h2 className="text-4xl font-semibold tracking-tight text-center">
            Register
          </h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={registerUser}>
            <div className="grid gap-4">
              <div className="md:flex md:space-x-2">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
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
              {error && <div className="text-red-500">{error}</div>}
              <Button type="submit">Register</Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <CardDescription>
            Already have an account?{" "}
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
