"use server";
//import { DJANGO_API_ENDPOINT } from "@/config/defaults";
import { DJANGO_API_ENDPOINT } from "../../../config/defaults";
import { getRefreshToken, getToken, setRefreshToken, setToken } from "../../../lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const DJANGO_API_LOGIN_URL = `${DJANGO_API_ENDPOINT}/token/pair`  //from defaults.jsx

export async function POST(request) {
    //If already set, get authToken from cookies
    const myAuthToken = getToken()
    const myRefreshToken = getRefreshToken()

    //Get request data sent from app/login/page.jsx
    const requestData = await request.json()  
    const jsonData = JSON.stringify(requestData)

    const requestOptions = {
        method: "POST",
        headers: {
                "Content-Type": "application/json"
                },
        body: jsonData
    }//end requestOptions

    const response = await fetch(DJANGO_API_LOGIN_URL, requestOptions)
    const responseData = await response.json()

    if(response.ok){
        
        //Set authToken to the access variable
        const {username, access, refresh} = responseData
        
        //From src/app/lib/auth.jsx
        setToken(access)
        setRefreshToken(refresh)

        return NextResponse.json({"loggedIn": true, "username":username}, {status: 200})

    }//end if

    return NextResponse.json({"loggedIn": false, ...responseData}, {status: 400})
}//end POST