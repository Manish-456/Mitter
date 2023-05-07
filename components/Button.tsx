import React from 'react'
 interface ButtonProps {
    label : string,
    secondary? : boolean,
    fullwidth? : boolean,
    large? : boolean,
    onClick? : () => void,
    disabled? : boolean,
    outline? : boolean
 }
const Button : React.FC<ButtonProps> = ({label, disabled, outline, onClick ,secondary, fullwidth, large}) => {
  return (
    <>
     <button
     disabled={disabled}
     onClick={onClick}
     className={`disabled:opacity-70
     disabled:cursor-not-allowed
     rounded-full
     font-semibold
     transition
     hover:opacity-80
     border-2
     ${fullwidth ? "w-full" : "w-fit"}
     ${secondary ? "bg-white text-black border-black" : "bg-sky-500 border-sky-500 text-white"}
     ${large ? "text-xl px-5 py-3" : "text-md px-4 py-2"}
     ${outline ? "bg-transparent border-white text-white" : "outline-none"}
 
     `}
     >{label}</button>  
     
    </>
  )
}

export default Button
