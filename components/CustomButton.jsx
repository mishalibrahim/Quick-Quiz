import Image from 'next/image'
import React from 'react'

const CustomButton = ({title,icon=false}) => {
  return (
    <button className={`h-[80px] flex  ${icon ? 'justify-between':'justify-center'} font-black px-[56px] text-white items-center text-[38px] w-full rounded-[80px] bg-primary`}>{title} 
    {
        icon && <Image src='/assets/right_icon.svg' width={22} height={22} alt='rightarrow'/>
    }
    </button>
  )
}

export default CustomButton