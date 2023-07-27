import React, { MouseEventHandler } from 'react'
import Image from 'next/image'

type Props = {
    title: string, 
    type: 'button' | 'submit'
    leftIcon?: string | null, 
    rightIcon?: string | null,
    isSubmitting?: boolean, 
    handleClick?: MouseEventHandler, 
    bgColor?: string, 
    textColor?: string
}

const Button = ({title, type, leftIcon, rightIcon, isSubmitting, handleClick, bgColor, textColor }: Props) => {
  return (
    <button type={type || 'button'} disabled={isSubmitting} className={`flexCenter gap-3 py-3 px-4 rounded-xl text-sm font-medium max-md:w-full ${textColor || 'text-white'} ${isSubmitting ? 'bg-black/50' :  bgColor || 'bg-primary-purple'}`} onClick={handleClick}>
        {leftIcon && <Image src={leftIcon} width={14} height={14} alt='left'/>}
        {title}
        {rightIcon && <Image src={rightIcon} width={14} height={14} alt='right'/>}
    </button>
  )
}

export default Button