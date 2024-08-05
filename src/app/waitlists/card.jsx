"use client"
import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription,
  CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"

const WAITLIST_API_URL = "/api/waitlists/"


export function WaitlistCard({waitlistEvent}) {
    const [message, setMessage] = useState('')
    const [errors, setErrors] = useState({})  //for list of errors
    const [error, setError] = useState('')  //for single errors

    console.log('waitlist data is:', waitlistEvent)
    if(!waitlistEvent && !waitlistEvent.email){
        return null
    }//end if

    async function handleSubmit (event) {
        event.preventDefault()
        setMessage("")
        setError("")
        setErrors({})
        //console.log(event, event.target)
        const formData = new FormData(event.target)
        const objectFromForm = Object.fromEntries(formData)
        const jsonData = JSON.stringify(objectFromForm)
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: jsonData
        }//end requestOptions
        console.log('json data is: ', jsonData)
       
        const full_url = `${WAITLIST_API_URL}${waitlistEvent.id}/`
        console.log('full proxy is: ', full_url)
        const response = await fetch(full_url, requestOptions)
        const data = await response.json()
        console.log(data)
        if (response.status === 201 || response.status === 200) {
            
            setMessage("Data changed!")
        }//end if
        
    }//end handleSubmit

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{waitlistEvent.email}</CardTitle>
        <CardDescription>{waitlistEvent.id}</CardDescription>
      </CardHeader>
      <CardContent>
        {message &&  <p>{message}</p>}
        <form onSubmit={handleSubmit}>
            <Input id="num_guests" name="num_guests" type="text" 
            placeholder="Enter number guests" defaultValue={waitlistEvent.num_guests} />

           <textarea name="description" placeholder="Your description">
           {waitlistEvent.description}

           </textarea >
          
          <Button type="submit" className="w-full">
          Save Description
        </Button>
        </form>
       
      </CardContent>
    </Card>
  )
}
