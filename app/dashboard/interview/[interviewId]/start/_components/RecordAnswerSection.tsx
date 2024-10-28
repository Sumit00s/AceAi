'use client'
import Webcam from 'react-webcam'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAiModel'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs';
import moment from 'moment';


const RecordAnswerSection = ({mockInterviewQuestions,activeQuestionIndex,interviewData}:{mockInterviewQuestions:any,activeQuestionIndex:any,interviewData:any}) => {

    const {user} = useUser();
    const [userAnswer,setUserAnswer] = useState('');
    const [loading,setLoading] = useState(false);

    const {
        error,
        interimResult,
        isRecording,
        results,
        setResults,
        startSpeechToText,
        stopSpeechToText,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });

      useEffect(()=>{
            results.map((result)=>(
                setUserAnswer(prevAns=>prevAns+result?.transcript)
            ))
      },[results])

      useEffect(()=>{
        if(!isRecording && userAnswer.length>10){
            UpdateUserAnswer();
        }
      },[userAnswer])

      const StartStopRecording=()=>{
        if(isRecording){
            stopSpeechToText();
        }

        else{
            startSpeechToText();
        }
      }

      const UpdateUserAnswer=async()=>{

            console.log(userAnswer);
            setLoading(true);
            const feedbackPrompt = "Question:"+mockInterviewQuestions[activeQuestionIndex]?.question+", User Answer: "+userAnswer+" Depends on question and user answer for given interview question please give us rating for answer and feedback as area of improvement if any in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

            const result = await chatSession.sendMessage(feedbackPrompt);
            const mockJsonResponse = (result.response.text()).replace('```json','').replace('```','')
            console.log(mockJsonResponse)
            const JsonFeedbackResp = JSON.parse(mockJsonResponse);

            const resp = await db.insert(UserAnswer).values({
                mockIdRef:interviewData.mockId,
                question:mockInterviewQuestions[activeQuestionIndex]?.question,
                correctAns:mockInterviewQuestions[activeQuestionIndex]?.answer,
                userAns:userAnswer,
                feedback:JsonFeedbackResp?.feedback,
                rating:JsonFeedbackResp?.rating,
                userEmail:user?.primaryEmailAddress?.emailAddress,
                createdAt:moment().format('DD-MM-yyyy')
            })

            if(resp){
                toast('User Answer recorded successfully');
                setResults([]);
            }
            setResults([]);
            setUserAnswer('');
            setLoading(false);
      }

  return (
    <div className='flex items-center justify-center flex-col'>
        <div className='flex mt-10 flex-col bg-black justify-center items-center rounded-lg p-5'>
            {/* <Image src={'/assets/webcam.png'} width={200} height={200} alt='web-cam' className='absolute'/> */}
            <Webcam
                mirrored={true}
                style={{height:400,width:400,zIndex:10}}
            />
        </div>
        <Button disabled={loading} onClick={StartStopRecording} variant={'outline'} className='my-10'>
            {isRecording? 
                <h2 className='flex items-center justify-center text-red-600'><Mic/>Recording</h2>
             : 'Record Answer'
            }
        </Button>
    
    </div>
  )
}

export default RecordAnswerSection