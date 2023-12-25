import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  ActionFunction,
  Form,
  redirect,
  useActionData,
} from "react-router-dom";
import { auth } from "../firestore";
import { StyledInput } from "../components/StyledInput";
import {
  ArrowLeftIcon,
  AtSymbolIcon,
  BackspaceIcon,
  BackwardIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";
import ELMLogo from "../assets/ElmLogo.png";
import { StyledSubmit } from "../components/StyledSubmit";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const errors = useActionData() as
    | {
        email?: string;
        password?: string;
        other?: string;
      }
    | undefined;
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Form
        method="post"
        className="flex flex-col gap-4 justify-center items-center px-4 py-8 rounded shadow border border-gray-200"
      >
        <img src={ELMLogo} className="rounded w-64" />
        <h1 className="text-2xl my-4">Create account</h1>
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

        <StyledSubmit name="Sign up" value="Sign up" />
        {errors?.other ? (
          <span className="text-red-500">{errors.other}</span>
        ) : null}
        <a href="/login" className="text-blue-500 flex items-center gap-2">
          <ArrowLeftIcon className="h-4 w-4" /> Back to login
        </a>
      </Form>
    </div>
  );
};

export default Signup;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const { email, password } = Object.fromEntries(formData);
  const errors: { email?: string; password?: string; other?: string } = {};
  if (email && password) {
    return await createUserWithEmailAndPassword(
      auth,
      email as string,
      password as string
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        return redirect("/");
      })
      .catch((e) => {
        errors.other = e.toString();
        return errors;
      });
  } else {
    if (!email) {
      errors.email = "Invalid email address.";
    }
    if (!password) {
      errors.password = "Invalid password.";
    }
    return errors;
  }
};
