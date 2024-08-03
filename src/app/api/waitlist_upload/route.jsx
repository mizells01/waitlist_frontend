import { getToken } from "../../../lib/auth";
import { NextResponse } from "next/server";
import { DJANGO_API_ENDPOINT } from "../../../config/defaults";
import ApiProxy from "../proxy";


const DJANGO_API_WAITLIST_UPLOAD_URL = `${DJANGO_API_ENDPOINT}/waitlists/waitlist_excel`


export async function POST(request) {
    const requestData = await request.json()  
    const {data, status} = await ApiProxy.post(DJANGO_API_WAITLIST_UPLOAD_URL, requestData, true)
    return NextResponse.json(data, {status: status})
}//end POST