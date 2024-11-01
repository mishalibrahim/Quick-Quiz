import { finishTest } from '@/api/quiz.actions';
import React from 'react'

const Result = async() => {

    const response = await finishTest();
  return (
    <div>Result</div>
  )
}

export default Result