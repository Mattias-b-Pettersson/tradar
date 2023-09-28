import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main>
      <UserButton afterSignOutUrl="/"/>
      <h1>Trådar</h1>
    </main>
  )
}
