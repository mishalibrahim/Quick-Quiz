"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./questions.module.css";
import { getQuizQuestions, submitAnswer, finishTest } from "@/api/quiz.actions";
import QuestionCounter from "@/components/QuestionCounter";
import CustomButton from "@/components/CustomButton";
import SkeletonLoader from "@/components/skeletenloader/SkeletonLoader";
import { useRouter } from "next/navigation";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showLoader, setShowLoader] = useState(false); //for showing SkeletonLoader when questions are being fetched
  const [startTime, setStartTime] = useState(Date.now()); // Set initial value to current timestamp

  const router = useRouter();

  useEffect(() => {
    const fetchQuestions = async () => {
      setShowLoader(true);
      try {
        let response = await getQuizQuestions();
        if(response.status !== 200){
          throw new Error('Failed to fetch questions');
        }
        setQuestions(response.data);
      } catch (error) {
        console.log(error)
      }
      finally{
        setStartTime(Date.now()); // Set start time when questions are fetched
        setShowLoader(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleBeforeUnload = (event) => {
    event.preventDefault();
    event.returnValue = '';
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOptions((prevSelected) => {
      if (prevSelected.includes(option)) {
        return prevSelected.filter((item) => item !== option);
      } else {
        if (questions[currentQuestion].answers.length === 1) { //check if question has single answer for handling multiple selection
          return [option];
        }
        else{
          return [...prevSelected, option];
        }
    
      }
    });
  };

  const handleNextQuestion = async (event) => {
    event.preventDefault(); 

    const currentQ = questions[currentQuestion];
    const timeTaken = (Date.now() - startTime) / 1000; 

    // Temporarily remove the beforeunload event listener to prevent the alert from showing when submitting the answer
    window.removeEventListener('beforeunload', handleBeforeUnload);

    try {
     const response =  await submitAnswer(currentQ.id, selectedOptions, timeTaken);
     if(response.status !== 200){
       throw new Error('Failed to submit answer');
     }

    } catch (error) {
      alert('Failed to submit answer. Please try again.');
    }

    setSelectedOptions([]); // Reset selected options for the next question
    setStartTime(Date.now()); // Reset start time for the next question

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      router.push('/result'); // Redirect to result page when all questions are answered
    }
    // Re-add the beforeunload event listener
    window.addEventListener('beforeunload', handleBeforeUnload);
  };

  return (
    <section className="flex relative flex-col h-full">
      <div className=" bg-secondary min-h-[180px]">
        <Image
          src="/assets/celebration_icon.svg"
          width={750}
          height={252}  
          alt="celeberation"
        />
      </div>
      <div className="bg-white rounded-t-[40px] w-full  mt-[-40px] relative h-auto   ">
        <QuestionCounter currentQuestionCount={currentQuestion + 1} totalQuestions ={questions.length} />
        <div className="mt-[135px] px-[40px] h-full">
          {questions.length > 0 && questions[currentQuestion] && !showLoader ? (
            <div className="mb-[40px]">
              <p className="text-[35px] font-black leading-[56px]">
                {questions[currentQuestion].question}
              </p>
              <div className="flex flex-col gap-[20px] mt-[20px]">
                {questions[currentQuestion].imgsrc && (
                  <div className="w-full h-full  relative flex justify-center items-center">
                    <Image
                      src={questions[currentQuestion].imgsrc}
                      width={300}
                      height={300}
                      objectFit="contain"
                      alt="question_img"
                      className="w-full h-full"
                    />
                  </div>
                )}
                <form onSubmit={handleNextQuestion} className="flex flex-col gap-[20px]" >
                {questions[currentQuestion].options.map((option, index) => (
                  <div
                    className={`${styles.option_wrap} w-full relative h-[80px] px-[20px] rounded-[15px] border  border-[#E0E0E0] flex items-center gap-[15px] cursor-pointer`}
                    key={index}
                  >
                  <input 
                    type="checkbox" 
                    className={styles.input} 
                    value={option} 
                    checked={selectedOptions.includes(option)} // Ensure checkbox reflects the state
                    onChange={() => handleOptionSelect(option)} 
                  />
                    <div className={styles.custom_checkbox}>
                      <Image src='/assets/check_icon.svg' width={14} height={24} alt="check" className={styles.check_icon}/>
                    </div>
                    <div className={styles.checbox_active_overlay} />
                    <p className="text-[20px] font-medium">{option}</p>
                  </div>
                ))}
                <div className="w-full fixed left-0 max-w-[750px] bottom-[40px] px-[20px] sm:px-[40px] ease-in duration-300 flex items-center justify-center">
                  <CustomButton
                    className="text-white text-[20px] font-medium"
                    title='next'
                    icon={true}
                    disabled={selectedOptions.length === 0} // Disable button if no option is selected
                  />
                </div>
                </form>
              </div>
            </div>
          ):( 
            <SkeletonLoader image={questions[currentQuestion]?.imgsrc && true} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Questions;
