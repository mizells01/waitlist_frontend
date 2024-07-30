'use client'

import { useAuth } from "@/components/authProvider";
import { ThemeToggleButton } from "@/components/themeToggleButton";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import WaitlistForm from "./waitlists/forms";

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home() {
  const auth = useAuth();

  //Use SWR for GET Requests Only
  const { data, error, isLoading } = useSWR("/api/hello", fetcher)
  
  // if(error) return <div>failed to load</div>
  // if(isLoading) return <div>loading...</div>


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>This Home Page file found at: src/app/page.js</div>
      <div>Cuurent data enpoint is: {data && data.apiEndpoint}</div>
      <div>
        <WaitlistForm />
      </div>
      <div>
        {auth.isAuthenticated ? "Hello user" : "Hello guest"}
      </div>
      <div>
        <ThemeToggleButton />
      </div>
      
    </main>
  );
}
