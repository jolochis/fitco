"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import { useSession, signOut } from "next-auth/react";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Not FaceBook
        </Link>
        <div className="space-x-4">
          {!session?.user ? (
            <>
              <Button>
                <Link href="/">Home</Link>
              </Button>
              <Button>
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button>
                <Link href="/auth/register">Register</Link>
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => signOut()}>Logout</Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
