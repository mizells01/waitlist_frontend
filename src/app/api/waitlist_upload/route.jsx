import { getToken } from "@/lib/auth";
import { NextResponse } from "next/server";

const DJANGO_API_WAITLISTS_UPLOAD_URL = "http://localhost:8000/api/waitlists/waitlist_upload/"

export async function POST(request, res) {
    
    const formData = await request.formData();
    const file = formData.get("file")
    const newFormData = new FormData();
    newFormData.append('file', file)
    //console.log('formData is: ', formData.get('file'))
    console.log('file is: ', file)
    console.log("Inside POST Upload...")
    
    let headers = {
            //"Content-Type": "application/json",
            //"Accept": "application/json"
            method: "POST",
            body: newFormData
        }
    const authToken = getToken();

    //Update header if authToken is available
    if(authToken){
        //headers["Authorization"] = `Bearer ${authToken}`
        console.log('Trying to add Bearer Token')
    }
    const requestOptions = {
        method: "POST",
        headers: headers
        
    }//end requestOptions

    const response = await fetch(DJANGO_API_WAITLISTS_UPLOAD_URL, requestOptions)
    console.log('Upload Status is: ', response.status)
    try {
        const responseData = await response.json()
        console.log('Response data is: ', responseData)
    } catch (error) {
        NextResponse.json({message: "Invalid request."}, {status: 404})
    }//end catch

    if(response.ok){
        return NextResponse.json({}, {status: 200})
    }//end if

    return NextResponse.json({}, {status: 400})
}//end POST