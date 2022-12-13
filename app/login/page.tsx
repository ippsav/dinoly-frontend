"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { LoginUserInput } from "../../lib/api";
import Toast from "../shared/Toast";



export default function LoginPage() {

  const router = useRouter();
  const defaultState: LoginUserInput = {
    username: "",
    password: ""
  };
  const defaultFieldCheck = {
    username: false,
    password: false,
  }
  const [userInput, setUserInput] = useState<LoginUserInput>(defaultState);
  const [fieldCheck, setFieldCheck] = useState(defaultFieldCheck);
  const [showToast, setShowToast] = useState(false);
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value
    })
  }


  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let state = fieldCheck;
    if (userInput.username.length < 5) {
      state.username = true;
    } else {
      state.username = false;
    }
    if (userInput.password.length < 5) {
      state.password = true;
    } else {
      state.password = false;
    }
    if (state.username || state.password) {
      setFieldCheck(s => {
        return { ...s, ...state }
      });
      return;
    }

    const response = await signIn("login", {
      username: userInput.username,
      password: userInput.password,
      redirect: false
    })
    if (!response?.error) {
      router.push("/");
    } else if (response.error === "user not found" || response.error === "invalid credentials") {
      setShowToast(true)
    }
  }

  return (
    <div className="h-full">
      <div className="container mx-auto w-2/3 h-full">
        <div className="card w-full max-w-md shadow-2xl bg-base-100 m-auto">
          <form onSubmit={handleOnSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input type="text" onChange={handleOnChange} placeholder="username" value={userInput.username} className={`input input-bordered ${fieldCheck.username && "input-error"}`} name="username" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" onChange={handleOnChange} placeholder="password" value={userInput.password} className={`input input-bordered ${fieldCheck.password && "input-error"}`} name="password" />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          {
            showToast && <Toast type="error" message="Invalid Credentials" />
          }
        </div>
      </div>
    </div>
  )
}
