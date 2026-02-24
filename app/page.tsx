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
    </>
  );
}
