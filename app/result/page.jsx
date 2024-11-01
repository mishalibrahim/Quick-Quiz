import { finishTest } from '@/api/quiz.actions';
import React from 'react'

const Result = async() => {
    try {
        const response = await finishTest();
        if(response.status !== 200){
            throw new Error('Failed to finish test');
        }
        
    } catch (error) {
        
    }


  return (
    <div>Result</div>
  )
}

export default Result