import { finishTest } from '@/api/quiz.actions';
import React from 'react'

const Result = async() => {
    try {
        const response = await finishTest();
        if(response.status !== 200){
            throw new Error('Failed to finish test');
        }
        console.log(response.data);

    } catch (error) {
        
    }


  return (
    <section className='flex relative flex-col h-full w-full'>
        
    </section>
  )
}

export default Result