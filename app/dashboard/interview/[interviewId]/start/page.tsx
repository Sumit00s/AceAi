
'use client'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import QuestionsSection from './_components/QuestionsSection';
import Link from 'next/link'
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';


const StartInterview = ({params}:{params:{interviewId:string}}) => {

  const [interviewData,setInterviewData] = useState({});
  const [mock_interview_questions,set_mock_interview_questions] = useState();
  const [activeQuestionIndex,setActiveQuestionIndex] = useState(0);

  useEffect(()=>{
    get_interview_details();
  },[])

  //TO GET THE DATA ACCORDING TO MOCKID
  const get_interview_details = async()=>{
    const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId,params.interviewId))
    const jsonMockResp = JSON.parse(result[0].jsonMockResp)
    set_mock_interview_questions(jsonMockResp);
    setInterviewData(result[0]);
  }
    
  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            {/* Questions */}
            <QuestionsSection 
             mockInterviewQuestions={mock_interview_questions}
             activeQuestionIndex={activeQuestionIndex}/>

            {/* Video,Audio Recording */}
            <RecordAnswerSection
             mockInterviewQuestions={mock_interview_questions}
             activeQuestionIndex={activeQuestionIndex}
             interviewData={interviewData}/>
        </div>

        <div className='flex justify-end gap-6'>
          {activeQuestionIndex>0 && 
          <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Prev Question</Button>}
          {activeQuestionIndex != mock_interview_questions?.length-1 && 
          <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
          {activeQuestionIndex == mock_interview_questions?.length-1 && 
          <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}>
            <Button>End</Button>
          </Link>
          }
        </div>
    </div>
  )
}

export default StartInterview