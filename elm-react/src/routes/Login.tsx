import { useState } from "react";
import { Form } from "react-router-dom";
import { StyledInput } from "../components/StyledInput";
import { AtSymbolIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import ELMLogo from "../assets/ElmLogo.png";
import { StyledSubmit } from "../components/StyledSubmit";
import { useFirebase } from "../providers/FirebaseProvider";
import { useRedirectLoggedInUser } from "../hooks/useProtectedRoute";

const Login = () => {
  useRedirectLoggedInUser();
  const { signIn } = useFirebase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Form
        method="post"
        className="flex flex-col gap-4 justify-center items-center px-4 py-8 rounded shadow border border-gray-200"
      >
        <img src={ELMLogo} className="rounded w-64" />
        <h1 className="text-2xl my-4">Login</h1>
        <StyledInput
          icon={<AtSymbolIcon />}
          iconposition="leading"
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        {errors?.email ? (
          <span className="text-red-500">{errors.email}</span>
        ) : null}
        <StyledInput
          icon={
            showPassword ? (
              <EyeIcon
                className="cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <EyeSlashIcon
                className="cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )
          }
          iconposition="leading"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        {errors?.password ? (
          <span className="text-red-500">{errors.password}</span>
        ) : null}

        <StyledSubmit
          name="Log In"
          value="Log In"
          onClick={async (e) => {
            e.preventDefault();
            const errors = await signIn(email, password);
            if (errors) {
              setErrors(errors);
            }
          }}
        />
        {errors?.other ? (
          <span className="text-red-500">{errors.other}</span>
        ) : null}
        {/* <p className="text-gray-700 text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500">
            Sign up
          </a>
        </p> */}
      </Form>
    </div>
  );
};

export default Login;
