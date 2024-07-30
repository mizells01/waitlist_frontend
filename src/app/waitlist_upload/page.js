'use client';
import { useAuth } from "@/components/authProvider";
import { useEffect } from "react";
import useSWR from "swr";
import WaitlistUploadForm from "./forms";

const fetcher = async url => {
    const res = await fetch(url)
   
    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.')
      // Attach extra info to the error object.
      error.info = await res.json()
      error.status = res.status
      throw error
    }
   
    return res.json()
  }

const WAITLIST_API_URL = "/api/waitlists/"
const WAITLIST_UPLOAD_API_URL = "/api/waitlist_upload/"

export default function Page() {

  //Use SWR for GET Requests Only
  const { data, error, isLoading } = useSWR(WAITLIST_API_URL, fetcher)
  const auth = useAuth()

  useEffect(()=>{
    if(error?.status === 401){
        auth.loginRequiredRedirect()  //see loginRequiredRedirect in authProvider.jsx
    }
  },[auth, error])

  if(error) return <div>failed to load</div>
  if(isLoading) return <div>loading...</div>

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div>
        <WaitlistUploadForm />
        {/* {JSON.stringify(data)} */}
        </div>
      
      
    </main>
  );
}

// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useRouter } from 'next/router';

// const UploadExcel = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [errorMessage, setErrorMessage] = useState(null);
//   const router = useRouter();

//   const { register, handleSubmit, formState: { errors } } = useForm();

//   const onSubmit = async (data) => {
//     setIsLoading(true);
//     setErrorMessage(null);
//     setSuccessMessage(null);

//     try {
//       const formData = new FormData();
//       formData.append('excel_file', data.excelFile[0]);

//       const response = await fetch('/api/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setSuccessMessage(data.message);
//         // Optionally redirect after successful upload
//         // router.push('/success'); 
//       } else {
//         const errorData = await response.json();
//         setErrorMessage(errorData.error);
//       }
//     } catch (error) {
//       setErrorMessage('An error occurred while uploading the file.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Upload Excel File</h1>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <input
//           type="file"
//           accept=".xlsx,.xls"
//           {...register('excelFile', { required: true })}
//         />
//         {errors.excelFile && <p>Please select an Excel file.</p>}

//         <button type="submit" disabled={isLoading}>
//           {isLoading ? 'Uploading...' : 'Upload'}
//         </button>
//       </form>

//       {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
//       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//     </div>
//   );
// };

// export default UploadExcel;



