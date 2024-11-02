import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex justify-between  flex-col bg-home-gradient h-[100dvh]">
      <div className="flex justify-center items-center pt-[20px]">
        <Image src="/assets/logo.png" width={160} height={71} alt="quiz" />
      </div>
      <div className="flex justify-center items-center">
        <div className="w-[250px] h-[250px] bg-white drop-shadow-home-circle flex justify-center items-center rounded-full">
          <p className="text-[49px] font-black text-primary">Quiz</p>
        </div>
      </div>
      <div className="px-[20px] sm:px-[60px] mb-[20px] ease-in duration-300 pb-[20px]">
        <Link href='/questions' className="h-[65px] max-w-[630px] w-auto sm:h-[80px] flex justify-center  font-black px-[56px] text-white items-center text-[38px] mx-auto rounded-[80px] bg-primary">Start</Link>
      </div>
    </section>
  );
}
