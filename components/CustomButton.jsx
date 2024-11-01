import Image from 'next/image'
import React from 'react'

const CustomButton = ({title,icon=false,onClick,disabled,className}) => {
  return (
    <button onClick={onClick} disabled={disabled} className={`sm:h-[80px] disabled:opacity-75  flex relative  justify-center font-black px-[56px] text-white items-center text-[38px] w-full rounded-[80px] bg-primary ${className}`}>{title} 
    {
        icon && <Image src='/assets/right_icon.svg' width={22} height={22} alt='rightarrow' className='absolute right-[40px]'/>
    }
    </button>
  )
}

export default CustomButton