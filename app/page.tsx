import {
  SignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <>
      {/* Check if already signed in to dashboard */}
      <SignedIn>
        {redirect("/dashboard")}
      </SignedIn>

      {/* if signed out show sign-in */}
      <SignedOut>
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
          <main className="w-full max-w-md rounded-lg bg-white p-8 shadow dark:bg-black">
            <SignIn forceRedirectUrl="/dashboard" />
          </main>
        </div>
      </SignedOut>
    </>
  );
}
