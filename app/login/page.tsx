"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { LoginUserInput } from "../../lib/api";


export default function LoginPage() {

  const router = useRouter();
  const defaultState: LoginUserInput = {
    username: "",
    password: ""
  };
  const [userInput, setUserInput] = useState<LoginUserInput>(defaultState);
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value
    })
  }

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    const response = await signIn("login", {
      username: userInput.username,
      password: userInput.password,
      redirect: false
    })
    if (!response?.error) {
      router.push("/");
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
              <input type="text" onChange={handleOnChange} placeholder="username" value={userInput.username} className="input input-bordered" name="username" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" onChange={handleOnChange} placeholder="password" value={userInput.password} className="input input-bordered" name="password" />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
