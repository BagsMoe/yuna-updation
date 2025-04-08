import React from 'react'
import { Sidebar } from '@/components/ui/sidebar'
import Image from 'next/image'

const SidebarLogin = () => {
  return (
    <Sidebar className='w-1/2 border-none py-8 pr-8' side='right'>
      <Image
        src="/login-sidebar.png"
        alt="Logo"
        width={688}
        height={960}
        className="object-cover h-full rounded-xl"
        priority={true}
      />
    </Sidebar>
  )
}

export default SidebarLogin