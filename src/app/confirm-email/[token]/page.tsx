'use client'
import { useRouter } from 'next/compat/router';
import { useEffect } from 'react';
import { useState } from 'react';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function  ConfirmEmail({ params }:any){
  
    const token = params.token;
    // const [status, setStatus] = useState('loading');

    // useEffect(() => {
    //     if (token) {
    //       confirmEmailToken(token);
    //     }
    //   }, [token]);
    //   const confirmEmailToken = async (token: string) => {
    //     try {
    //       console.log(JSON.stringify({token}));
    //       const response = await fetch(`${baseUrl}/persons/email`, {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({token})
    //     });
    //       if (response.ok) {
    //         setStatus('success');
    //       } else {
    //         const errorData = await response.json();
    //         console.log('Server responded with error:', errorData);
    //         setStatus('error');
    //       }
    //     } catch (error) {
    //       console.error('An error occurred:', error);
    //       setStatus('error');
    //     }
    //   };
      

  return (
    <div>
      <h1>Your email has been confirmated. 🤡</h1>
    </div>
  );
};
