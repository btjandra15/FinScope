"use client"

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/auth-actions";
import SidePicture from "../../../../public/images/loginSidePicture.jpg";
import { useState } from "react";

export const description = "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image."

export function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const result = await login(formData);

    if(result?.error){
      setErrorMessage(result.error.message);
    }
  }

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>

            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>

            {errorMessage && (
              <div className="text-red-500 text-center mb-4">{errorMessage}</div>
            )}
          </div>

          <form action="">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email"  name="email" type="email" placeholder="m@example.com" required/>
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                    
                  <Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                  </Link>
                </div>

                <Input id="password" name="password" type="password" required />
              </div>

              <Button type="submit" formAction={login} className="w-full">
                Login
              </Button>
            </div>
          </form>

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}

            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden bg-muted lg:block">
        <Image src={SidePicture} alt="Image" width="1920" height="2000" className="min-h-screen min-h-screen object-cover dark:brightness-[0.2] dark:grayscale"/>
      </div>
    </div>
  )
}