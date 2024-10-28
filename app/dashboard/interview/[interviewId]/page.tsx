'use client'
import React,{useEffect, useState} from 'react';
import { db } from '@/utils/db'
import { eq } from 'drizzle-orm'
import { MockInterview } from '@/utils/schema'
import Webcam from "react-webcam";
import { Ghost, Lightbulb, WebcamIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Interview = ({params}:{params:{interviewId:string}}) => {

  const [interviewData,setInterviewData] = useState({});
  const [webCamEnable,setWebCamEnable] = useState(false);
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
    <div className='my-10'>
        <h2 className='font-bold text-2xl'>Let's Get Started</h2>
        <div className='grid grid-cols-2 md:grid-cols-2 gap-10 justify-center'>
              <div className='flex flex-col my-5 gap-5'>

                  <div className='flex flex-col p-5 rounded-lg border gap-5'>
                    <h2 className='text-lg'><strong>Job Role:</strong>{interviewData.jobPosition}</h2>
                    <h2 className='text-lg'><strong>Job Description:</strong>{interviewData.jobDesc}</h2>
                    <h2 className='text-lg'><strong>Years Of Experience:</strong>{interviewData.jobExperience}</h2>
                  </div>

                  <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-50'>
                    <h2 className='flex gap-2 items-center text-yellow-500 mb-4'><Lightbulb/><strong>Information</strong></h2>
                    <h2>The webcam is enabled to ensure test integrity. Any attempt at cheating or unauthorized activities will be detected and may result in disqualification. Please maintain focus on the test screen and avoid external assistance.</h2>
                  </div>

              </div>
              
              <div>
                {webCamEnable 
                  ? <Webcam 
                      onUserMedia={()=>setWebCamEnable(true)} 
                      onUserMediaError={()=>setWebCamEnable(false)}
                      mirrored={true}
                      style={{height:400,width:400}}/>
                  : <div>
                      <WebcamIcon className='h-72 w-full my-7 p-10 bg-secondary rounded-lg border'/>
                      <Button variant="ghost" className='w-full' onClick={()=>setWebCamEnable(true)}>Enable Web Cam</Button>
                    </div>
                }
              </div>
        </div>

        <div className='flex justify-end items-end mt-3'>
          <Link href={'/dashboard/interview/'+params.interviewId+'/start'}><Button>Start</Button></Link>
        </div>

    </div>
  )
}

export default Interview