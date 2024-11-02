"use client";
import { finishTest } from "@/api/quiz.actions";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./result.module.css";
import { useAppContext } from "../context";
import Link from "next/link";

const Result = () => {
  const { userAnswers, setUserAnswers } = useAppContext();
  const [result, setResult] = useState({});
  const [resultProgress, setResultProgress] = useState(48);
  const [resultPercentage, setResultPercentage] = useState(0);

  useEffect(() => {
    // Load user answers from local storage on component mount
    if (!userAnswers || userAnswers.length === 0) {
      const savedUserAnswers = localStorage.getItem("userAnswers");
      if (savedUserAnswers) {
        setUserAnswers(JSON.parse(savedUserAnswers));
      }
    }
  }, [setUserAnswers]);

  useEffect(() => {
    if (userAnswers) {
      localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
  }
  }, [userAnswers]);

  useEffect(() => {
    const fetchResults = async (userAnswers) => {
      try {
        const response = await finishTest(userAnswers);
        if (response.status !== 200) {
          throw new Error("Failed to finish test");
        }
        setResult(response.data);
      } catch (error) {
        alert("something wrong happened please try again later");
      }
    };
    fetchResults(userAnswers);
  }, [userAnswers.length]);

  const duration = 1000; // Total duration for the animation in milliseconds
  const steps = 120; // Number of steps to reach the target, adjust for smoothness

  useEffect(() => {
    const { correctAnswers, totalQuestions } = result;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    
    const incrementPercentage = () => {
      setResultPercentage((prevPercentage) => {
        if (prevPercentage < percentage) {
          return prevPercentage + 1; // Increment by 1
        } else {
          clearInterval(intervalId); // Clear the interval once the target is reached
          return prevPercentage;
        }
      });
    };
    const intervalId = setInterval(incrementPercentage, duration / steps); // Increment every second

    const rotation = 48 + 180 * (percentage / 100);
    setResultProgress(rotation);

    return () => clearInterval(intervalId); // Clear the interval on component unmount
  }, [result]);

  return (
    <section className="flex relative flex-col h-full w-full">
      <div className="bg-secondary w-full h-auto min-h-[174px] max-h-[234px]">
        <Image
          src="/assets/celebration_icon.svg"
          width={710}
          height={256}
          alt="celebration"
          className="w-full translate-y-[-17%]"
        />
      </div>
      <div className="bg-white rounded-t-[40px] w-full  mt-[-40px] relative h-auto pb-[30px] px-[20px] sm:px-[40px] ">
        <p className="text-[36px] sm:text-[56px] font-bold text-text_primary text-center mt-[40px]">
          Your Result
        </p>
        <div className="w-full justify-center flex items-center h-full mt-[40px] sm:mt-[60px]">
          <div className={styles.gauge}>
            <Image
              src="/assets/progressbar_top.svg"
              width={200}
              height={200}
              alt="gauge"
              className="absolute top-0 z-[2] w-full"
            />
            <div className={styles.outer_circle}>
              <div
                className={styles.gauge_bar}
                style={{ transform: `rotate(${resultProgress}deg)` }}
              ></div>
            </div>
            <div className={styles.inner_circle}>
              <p className="text-text_primary font-black sm:text-[64px] text-[30px] ">
                {resultPercentage}%
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-[40px]">
          <ResultCard
            value={result?.correctAnswers ? result?.correctAnswers : 0}
          />
          <ResultCard
            value={
              result?.totalQuestions - result?.correctAnswers
                ? result?.totalQuestions - result?.correctAnswers
                : 0
            }
            correct={false}
          />
        </div>
      </div>
      
      <div className="px-[20px] sm:px-[60px] mb-[20px] ease-in duration-300 pb-[20px]">
        <Link href='/questions' className="h-[65px] w-auto mx-auto max-w-[670px] sm:h-[80px] flex justify-center  font-black px-[56px] text-white items-center text-[24px] sm:text-[38px]  rounded-[80px] bg-primary">Start Again</Link>
      </div>
    </section>
  );
};

export default Result;

const ResultCard = ({ correct = true, value }) => {
  return (
    <div
      className={`w-full ${
        correct ? "bg-[#e9f6ef]" : "bg-[#ffe8e8]"
      } h-[130px]rounded-[20px] flex gap-[20px] items-center px-[20px] sm:px-[30px] py-[35px] sm:py-[51px] rounded-[20px]`}
    >
      <div
        className={`${
          correct ? "bg-[#44B77B]" : "bg-primary"
        } w-[28px] h-[28px] rounded-full`}
      ></div>
      <span className="text-[#000000] text-[22px] sm:text-[32px] font-bold">
        {value}
      </span>
      <p className="text-[#58819f] text-[22px]  sm:text-[32px] font-semibold">
        {correct ? "Correct" : "Incorrect"}
      </p>
    </div>
  );
};
