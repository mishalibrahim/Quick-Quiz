'use client'
import React, { useEffect, useState } from 'react'

const QuestionCounter = ({currentQuestionCount,totalQuestions}) => {
    const circumfernece = 251.2;
    const [progress, setProgress] = useState(circumfernece);

    useEffect(() => {
      calculateProgress();
    }, [currentQuestionCount, totalQuestions]);

    const calculateProgress = () => {
      const offset = circumfernece - (circumfernece * (currentQuestionCount / totalQuestions));
      setProgress(offset);
    }

    return (
      <div className="flex justify-center items-center absolute top-0 left-0 w-full">
        <div className="w-[200px] flex items-center translate-y-[-50%] justify-center h-[200px] relative rounded-full bg-white">
          <svg
            width="200"
            height="200"
            viewBox="0 0 100 100"
            className="rotate-[-90deg]"
          >
            <circle
              r="40"
              cx="50"
              cy="50"
              fill="transparent"
              strokeDasharray="251.2"
              stroke="#F3F4FA"
              strokeDashoffset='0'
              strokeWidth="8px"
            ></circle>
            <circle
              r="40"
              cx="50"
              cy="50"
              fill="transparent"
              stroke="#44B77B"
              strokeWidth="8px"
              strokeLinecap="round"
              strokeDasharray="251.2"
              strokeDashoffset={progress}
              style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
            ></circle>
          </svg>
          <div className="absolute top-0 w-full h-full left-0 flex justify-center gap-[4px] items-center">
            <p className="text-[90px] font-black italic text-text_primary">{currentQuestionCount}</p>
            <p className="text-[35px] italic font-black text-[#aeaeae] translate-y-[16px]">/{totalQuestions}</p>
          </div>
        </div>
      </div>
    )
}

export default QuestionCounter