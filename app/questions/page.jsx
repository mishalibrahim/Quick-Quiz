import Image from "next/image";
import React from "react";
import styles from "./questions.module.css";

const Questions = () => {
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
      <div className="bg-white rounded-t-[40px] w-full h-full mt-[-40px] relative">
        <div className="flex justify-center items-center absolute top-0 left-0 w-full">
          <div className="w-[200px] flex items-center  translate-y-[-50%] justify-center h-[200px] relative rounded-full   bg-white">
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
                stroke="#F3F4FA"
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
                strokeDasharray="439.6px"
                strokeDashoffset="409.9px"
              ></circle>
            </svg>
            <div className="absolute top-0 w-full h-full left-0 flex justify-center gap-[4px] items-center">
                <p className="text-[90px] font-black italic">1</p>
                <p className="text-[35px] italic font-black text-[#aeaeae] translate-y-[16px]">/5</p>
            </div>
          </div>
        </div>
        <div className="mt-[135px] px-[40px]">
        <p className="text-[35px] font-black leading-[56px]">How do you judge what should be added in the next version of the app?</p>
      </div>
      </div>
 
    </section>
  );
};

export default Questions;
