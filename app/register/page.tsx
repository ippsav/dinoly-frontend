'use client';

import { ChangeEvent, FormEvent, useState } from "react";
import { RegisterUserInput } from "../../lib/api";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";







export default function RegisterPage() {
  const router = useRouter();
  const defaultState: RegisterUserInput = {
    username: "",
    email: "",
    password: ""
  };
  const [userInput, setUserInput] = useState<RegisterUserInput>(defaultState);
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value
    })
  }

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    const response = await signIn("signup", {
      username: userInput.username,
      email: userInput.email,
      password: userInput.password,
      redirect: false
    })
    console.log(response);
    router.push("/");
  }



  return (
    <div className="h-full">
      <div className="container mx-auto w-2/3 h-full">
        <div className="card w-full max-w-md shadow-2xl bg-base-100 m-auto">
          <form onSubmit={handleOnSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="text" onChange={handleOnChange} placeholder="email" value={userInput.email} className="input input-bordered" name="email" />
            </div>
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
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
