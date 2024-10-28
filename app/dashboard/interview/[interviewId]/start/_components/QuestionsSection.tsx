import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

const QuestionsSection = ({mockInterviewQuestions,activeQuestionIndex}:{mockInterviewQuestions:any,activeQuestionIndex:any}) => {

  const textToSpeech = (text:any) =>{
    if('speechSynthesis' in window){
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    }
    else{
      alert("Sorry, your browser does not support text to speech");
    }
  }

  return mockInterviewQuestions&&(
    <div className='p-5 border rounded-lg mt-10 my-10'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {mockInterviewQuestions &&
          mockInterviewQuestions.map((question:any,index:number)=>(
            <h2 className={`p-2 bg-secondary rounded-full text-x md:text-sm text-center cursor-pointer ${activeQuestionIndex == index && 'bg-black text-white'}`}>Question #{index+1}</h2>
          ))
        }

      </div>

        <h2 className='my-5 text-md md:text-lg'>{mockInterviewQuestions[activeQuestionIndex]?.question}</h2>

        <Volume2 className=' cursor-pointer' onClick={()=>textToSpeech(mockInterviewQuestions[activeQuestionIndex]?.question)}/>

        <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
            <h2 className='flex gap-2 items-center text-black'>
              <Lightbulb/><strong>Note:</strong>
            </h2>
            <h2 className='text-sm text-black'>The webcam is enabled to ensure test integrity. Any attempt at cheating or unauthorized activities will be detected and may result in disqualification. Please maintain focus on the test screen and avoid external assistance.</h2>
        </div> 

    </div>
  )
}

export default QuestionsSection