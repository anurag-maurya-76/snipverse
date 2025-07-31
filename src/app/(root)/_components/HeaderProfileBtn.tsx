"use client";
import { SignedOut, SignInButton } from "@clerk/clerk-react";
import { UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";

export default function HeaderProfileBtn() {
  return (
    <>
      <UserButton>
        <UserButton.MenuItems>
          <UserButton.Link
            label="profile"
            labelIcon={<User className="size-4" />}
            href="/profile"
          />
        </UserButton.MenuItems>
      </UserButton>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </>
  );
}
