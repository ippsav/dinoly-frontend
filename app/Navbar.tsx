import Link from "next/link";

export default function Navbar() {

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">Dinoly.</Link>
      </div>
      <div className="flex-none">
        <Link href="/login" className="btn btn-ghost mr-5">SignIn</Link>
        <Link href="/register" className="btn btn-ghost">SignUp</Link>
      </div>
    </div>
  )
}
