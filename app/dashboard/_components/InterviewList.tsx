'use client'

import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import Link from 'next/link'


const InterviewList = () => {

  const {user} = useUser();
  const [interviewList,setInterviewList] = useState([]);

  useEffect(()=>{
    user&&GetInterviewList();
  },[user]);

  const GetInterviewList = async()=>{
    const result = await db.select().from(MockInterview).where(eq(MockInterview.createdBy,user?.primaryEmailAddress?.emailAddress)).orderBy(desc(MockInterview.id))
    console.log(result);
    setInterviewList(result);
  } 

  return (
    <div>
        <h2 className='font-medium text-xl'>Previous Mock Interview</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {interviewList && interviewList.map((interview,index)=>(
            <div className='border shadow-sm rounded-lg p-3'>
                <h2 className='font-bold text-black'>{interview?.jobPosition}</h2>
                <h2 className='text-sm text-gray-600'>{interview?.jobExperience} Years of Experience</h2>
                <h2 className='text-xs text-gray-500'>Created At: {interview.createdAt}</h2>
                <div className='flex justify-between mt-2 gap-2'>
                  <Link href={`/dashboard/interview/`+interview?.mockId+'/feedback'} className='w-full'>
                  <Button size='sm' className='w-full'>feedback</Button>
                  </Link>

                  <Link href={`/dashboard/interview/`+interview?.mockId} className='w-full'>
                  <Button size='sm' className='w-full'>Start</Button>
                  </Link>
                </div>
            </div>
          ))
          }
        </div>
    </div>
  )
}

export default InterviewList