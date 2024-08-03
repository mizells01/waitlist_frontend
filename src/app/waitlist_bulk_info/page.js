'use client'

import React, { useState } from 'react'
import WaitlistTable from '../waitlists/table'
//import { Button } from '@/components/ui/button'
import { Button } from '../../components/ui/button'
import * as XLSX from "xlsx";

export default function Page() {
  //file
  const WAITLIST_UPLOAD_API_URL = "/api/waitlist_upload/"

  const [file, setFile] = useState(null)
  const [jsonData, setJsonData] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [neededFieldList, setNeededFieldList] = useState([])
  const [keyErrorMessage, setKeyErrorMessage] = useState("")
  const [keyError, setKeyError] = useState(false)
  console.log(file)

  async function checkKeys(obj){
    var ans = ""
    var needed_field_list = []
    var targetKey = ""
    var keyErrorMessage = ""
    var keyList = ['email', 'updated', 'timestamp', 'bird', 'amount'];
    var listLen = keyList.length;
    for (var i=0; i < listLen; i++){
      targetKey = keyList[i];
      //console.log('Checking the for the key: ', keyList[i]);

      if (obj[0][targetKey]){
        //.log('This field is a key', targetKey)
      }else{
        needed_field_list.push(targetKey)
        ans += `${targetKey} is not a field in the spreadsheet.`
        //console.log('This key is not a field', targetKey)
        setKeyError[true]
      }

    }//end for
    if(needed_field_list.length > 0){
      setNeededFieldList(neededFieldList.toString())
      keyErrorMessage = `Cannot process until these field(s) are added to the spreadsheet: [${needed_field_list.toString()}]`
      console.log("Key Error Message is: ", keyErrorMessage)
      console.log('Key error is: ', keyError)
    }//end if
    
    
  }//end checkKeys

  async function handleSaveData (event) {
    const formData = jsonData

    const requestOptions = {
      method: "POST",
      body: formData,
  }
  const response = await fetch(WAITLIST_UPLOAD_API_URL, requestOptions)
  if (response.ok) {
      setMessage("Thank you for uploading")
  }else{
      setError("There was an error with your upload.  Maybe issue with duplicate entries. Please try again.")
  }

  }//end handleSaveData

  function previewData(){
    
    if(file){
      const reader = new FileReader()  //FileReader can read ANY File..not just Excel
      reader.onload = (e)=>{
        const data = e.target?.result
        if(data){
          const workbook = XLSX.read(data, {type: "binary"})
          //SheetName
          const sheetName = workbook.SheetNames[0]
          //Worksheet
          const workSheet = workbook.Sheets[sheetName]
          //JSON
          const json = XLSX.utils.sheet_to_json(workSheet)
          setJsonData(JSON.stringify(json, null, 2))
          //Check Keys
          checkKeys(json)
      
        }//end if
      };//end reader onload
      reader.readAsBinaryString(file)

      
    }//end if
  }

  //json stringfield (purpose for reviewing)
  return (
    <div className="min-h-screen max-w-4xl mx-auto">
        {/* BUTTONS */}

        {/* upload input, preview btn, save btn, clear Data */}
        {message ? message : ""}
        {error ? error: ""}
        <div className="flex items-center gap-8">
            <div className="py-8">
            <label className="block mb-2 text-sm font-medium text-gray-900
             dark:text-white" htmlFor="file_input">
                Upload file
            </label>
            <input className="block w-full text-sm text-gray-900 border
             border-gray-300 rounded-lg cursor-pointer bg-gray-50
              dark:text-gray-400 focus:outline-none dark:bg-gray-700
               dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input" type="file" accept=".xlsx,.xls"
                onChange={(e)=>setFile(e.target.files ? e.target.files[0] : null)}
                />
            </div>
            <Button onClick={previewData} className="py-2 px-6 rounded bg-slate-300 text-slate-900">Preview Data</Button>
            <Button onClick={handleSaveData} className="py-2 px-6 rounded bg-purple-600 text-slate-900">Save Data</Button>
            <Button className="py-2 px-6 rounded bg-red-600 text-slate-900">Clear Data</Button>
        </div>
        {/* Preview JSON Data */}
        <pre>
          {jsonData}
        </pre>
        {/* Table */}
      <WaitlistTable />
    </div>
  )
}

