"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { API_URL } from "../lib/api";



export default function MainPage() {
  const { data, status } = useSession();
  console.log(API_URL);
  if (status === "unauthenticated") {
    return <Home />
  } else if (data) {
    return <App username={data.user.username} />
  }
}


function Home() {
  return (
    <div className="hero bg-base-200 h-full">
      <div className="hero-content text-center ">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Dinoly.</h1>
          <p className="py-6">Your way to go for url shortners to minimize the web page address into something that's easier to remember and track !</p>
          <Link href="/login" className="btn btn-primary">Get Started</Link>
        </div>
      </div>
    </div>
  )
}

type AppProps = {
  username: string,
}

function App({ username }: AppProps) {
  return (
    <div className="hero bg-base-200 h-full">
      <div className="hero-content text-center ">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hi {username}.</h1>
          <p className="py-6">Your way to go for url shortners to minimize the web page address into something that's easier to remember and track !</p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  )
}



