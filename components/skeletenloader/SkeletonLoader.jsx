import React from "react";
import styles from "./SkeletonLoader.module.css";

const SkeletonLoader = ({ image = false }) => {
  return (
    <section className={`bg-white w-full h-auto flex flex-col gap-[20px]`}>
      <div className={` w-full min-h-[125px] ${styles.skeleton}`}>
        {image && <div className={`w-full min-h-[300px] h-full ${styles.skeleton}`}></div>}
      </div>
      {
        Array(4).fill().map((_, index) => (
          <div key={index} className={`w-full h-[60px] ${styles.skeleton}`}></div>
        ))
      }
    </section>
  );
};

export default SkeletonLoader;
