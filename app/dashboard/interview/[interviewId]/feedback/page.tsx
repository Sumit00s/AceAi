'use client'

import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

import { index } from 'drizzle-orm/mysql-core'
import { ChevronsUpDown } from 'lucide-react'

const Feedback = ({params}:{params:any}) => {

  const [feedbackList,setfeedbackList] = useState([]);
  const router = useRouter();

  useEffect(()=>{
    GetFeedback();
  },[]);

  const GetFeedback= async()=>{
    const result = await db.select().from(UserAnswer).where(eq(UserAnswer.mockIdRef,params.interviewId)).orderBy(UserAnswer.id)
    console.log(result);
    setfeedbackList(result);
  }

  return (
    <div className='p-10'>
      <h2 className='text-3xl font-bold text-green-500'>Congratulation</h2>
      <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
      <h2 className='text-primary text-lg my-3'>Your overall interview rating: <strong>7/10</strong></h2>

      <h2 className='text-sm text-gray-500'>Find below interview question with correct answer and feedback for improvement</h2>

      {feedbackList && feedbackList.map((item,index)=>(
          <Collapsible key={index} className='mt-7'>
          <CollapsibleTrigger className='p-2 bg-secondary rounded-lg flex justify-between my-2 text-left gap-7'>{item.question}<ChevronsUpDown className='h-5 w-5'/></CollapsibleTrigger>
          <CollapsibleContent>
            <div className='flex flex-col gap-2'>
              <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating:</strong>{item.rating}</h2>
              <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-800'><strong>Your Answer:</strong>{item.userAns}</h2>
              <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-800'><strong>Correct Answer:</strong>{item.correctAns}</h2>
              <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-blue-800'><strong>Feedback:</strong>{item.feedback}</h2>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}

      <Button onClick={()=>router.replace('/dashboard')}>Back To Home</Button>
    </div>
  )
}

export default Feedback