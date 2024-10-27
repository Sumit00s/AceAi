'use client'
import React,{useEffect, useState} from 'react'
import { db } from '@/utils/db'
import { eq } from 'drizzle-orm'
import { MockInterview } from '@/utils/schema'

const Interview = ({params}:{params:{interviewId:string}}) => {

  const [interviewData,setInterviewData] = useState({});
  useEffect(()=>{
    console.log(params.interviewId);
    get_interview_details();
  },[])

  //TO GET THE DATA ACCORDING TO MOCKID
  const get_interview_details = async()=>{
    const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId,params.interviewId))
    setInterviewData(result[0]);
  }

  return (
    <div className='my-10 flex justify-center flex-col items-cente'>
        <h2 className='font-bold text-2xl'>Let's Get Started</h2>
    </div>
  )
}

export default Interview