import React from 'react'
import { Link } from 'react-router-dom'
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='bg-slate-200'>
      <div className='container mx-auto p-4 text-sm flex items-center justify-around'>
        <div className='flex items-center gap-2 hover:text-green-700'>
          <FaLinkedin className='text-red-600'/>
          <Link title='linkedin' to={"https://www.linkedin.com/in/pavlo-kucheriavykh-1b8053329"}>Contact</Link>
        </div>
        <div className='flex items-center gap-2 hover:text-green-700'>
          <FaGithub className='text-red-600'/>
          <Link title='github' to={"https://github.com/PashaKycher"}>Repositories</Link>
        </div>
        <p title='full stack development' className='hidden md:block'>Created by Kucheriavych Pavel</p>
      </div>
    </footer>
  )
}

export default Footer