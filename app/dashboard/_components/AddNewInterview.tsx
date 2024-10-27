"use client"

import React from 'react'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { chatSession } from '@/utils/GeminiAiModel';
import { LoaderCircle } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/router';

const AddNewInterview = () => {

  const [openDialog,setOpenDialog] = useState(false);
  const [jobPosition,setJobPosition] = useState("");
  const [jobDesciption,setJobDesciption] = useState("");
  const [jobExpreience,setJobExpreience] = useState(1);
  const [loading,setLoading] = useState(false);
  const [jsonResponse,setJsonRespone] = useState([]);
  const {user} = useUser();
  const router = useRouter();

  const onSubmit = async (e: { preventDefault: () => void; }) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobPosition,jobDesciption,jobExpreience);

    const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesciption}, Years of Experence: ${jobExpreience}, Depends on the Job Position , Description and Experence give us 5 interview questions along with answer as field in json`
    const result = await chatSession.sendMessage(InputPrompt)
    const MockJsonResp = (result.response.text()).replace('```json','').replace('```','')

    console.log(JSON.parse(MockJsonResp));
    setJsonRespone(MockJsonResp)

    if(MockJsonResp){
      const res = await db.insert(MockInterview)
      .values({
        mockId:uuidv4(),
        jsonMockResp:MockJsonResp,
        jobPosition:jobPosition,
        jobDesc:jobDesciption,
        jobExperience:jobExpreience,
        createdBy:user?.primaryEmailAddress?.emailAddress,
        createdAt:moment().format('DD-MM-yyyy')
      }).returning({mockId:MockInterview.mockId})

      console.log("Inserted ID",res);
      if(res){
        setOpenDialog(false);
        router.push('/dashboard/interview/'+res[0]?.mockId)
      }
    }
    else{
      console.log("Gemini Does not Able to generate Questions...")
    }

    setLoading(false);
  }

  return (
    <div>
      <div className='p-10 border rounded-lg shadow-sm hover:scale-105 hover:shadow-md cursor-pointer transition-all' onClick={()=>setOpenDialog(true)}>
        <h2 className="text-md text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog}>
      <DialogContent className='max-w-xl'>
        <DialogHeader>
          <DialogTitle className='text-2xl'>Tell us more about Job you are interviewing</DialogTitle>
          <DialogDescription>
           <form onSubmit={onSubmit}>
           <div>
              <h2>Add details about your job role, job description and years of experience.</h2>

              <div className='mt-7 my-3'>
                {/* <label>Job Role</label> */}
                <Input placeholder="Role" required onChange={(e)=>setJobPosition(e.target.value)}/>
              </div>

              <div className='my-3'>
                {/* <label>Job Description</label> */}
                <Textarea placeholder='Description' required onChange={(e)=>setJobDesciption(e.target.value)}/>
              </div>

              <div className='my-3'>
                {/* <label>Years of experience</label> */}
                <Input placeholder="Experience" type='number' required onChange={(e)=>setJobExpreience(Number(e.target.value))}/>
              </div>

           </div>

            <div className='flex gap-5 justify-end'>
              <Button type='button' className='border border-black-900 outline-none px-5' variant="ghost" onClick={()=>setOpenDialog(false)}>Cancel</Button>
              <Button type='submit' disabled={loading} className='px-7'>
                {loading ? <><LoaderCircle className='animate-spin'/> Generating</> : 'Start'}
              </Button>
            </div>
           </form>

          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>

    </div>
  )
}

export default AddNewInterview