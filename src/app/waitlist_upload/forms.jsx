"use client"

import { NextResponse } from "next/server";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

const WAITLIST_UPLOAD_API_URL = "/api/waitlist_upload/"

export default function WaitlistUploadForm() {
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    async function handleSubmit (event) {
        event.preventDefault()
        console.log("Hey")
        //const file = event.target
        //console.log('file is: ', file)
        const formData = new FormData(event.target)
        const file = formData.get("file")
        console.log('file is: ', file)
        //const formData = new FormData();
        //formData.append('file', file);
        //const formData = new FormData(event.target)
        //const file = formData.get("file")
        const filename = file.name.replaceAll(" ", "_")
        const filesize = file.size
        console.log(`filename is: ${filename} and size is ${filesize}`, file)
       
        const requestOptions = {
            method: "POST",
            body: formData,
        }
        const response = await fetch(WAITLIST_UPLOAD_API_URL, requestOptions)
        if (response.ok) {
            setMessage("Thank you for uploading")
        }else{
            setError("There was an error with your upload.  Please try again.")
        }
    }//end handleSubmit


  return (
    <div className="grid gap-4" enctype="multipart/form-data">
            <form onSubmit={handleSubmit}>
                <div>{message && message}</div>
                <div>{error && error}</div>
                <div className="grid gap-2">
                <Label htmlFor="upload">Waitlist Upload</Label>
                <Input
                    id="file"
                    type="file"
                    name="file"
                    //placeholder="Your file..."
                    accept=".xls, .xlsx"
                />
                </div>
              
                <Button type="submit" className="w-full">
                    Upload
                </Button>
            </form>
          </div>
  )
}
