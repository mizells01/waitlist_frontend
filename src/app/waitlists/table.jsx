"use client"

import fetcher from "../../lib/fetcher";
import { useAuth } from "../../components/authProvider";
import {
    Table, TableBody,  TableCaption,
    TableCell, TableFooter, TableHead,
    TableHeader, TableRow,
  } from "../../components/ui/table"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import useSWR from "swr"

const WAITLIST_API_URL = "/api/waitlists/"

  
  export default function WaitlistTable() {
    const router = useRouter() //from next/navigation
    const { data, error, isLoading } = useSWR(WAITLIST_API_URL, fetcher)
    const auth = useAuth()

    useEffect(()=>{
        if(error?.status === 401){
            auth.loginRequiredRedirect()  //see loginRequiredRedirect in authProvider.jsx
        }
    },[auth, error])

    console.log('Error is: ', error)
    if(error) return <div>failed to load</div>
    if(isLoading) return <div>loading...</div>
    
    return (
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Num Guests</TableHead>
            <TableHead>Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, idx) => (
            <TableRow className="hover: cursor-pointer" key={`item-${idx}`} onClick={e=>router.push(`/waitlists/${item.id}`)}>
              <TableCell className="font-medium">{item['id']}</TableCell>
              <TableCell className="font-medium">{item['email']}</TableCell>
              <TableCell className="font-medium">{item['description']}</TableCell>
              <TableCell className="font-medium text-center">{item['num_guests']}</TableCell>
              <TableCell className="font-medium text-center">{item['updated']}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        
      </Table>
    )
  }
  