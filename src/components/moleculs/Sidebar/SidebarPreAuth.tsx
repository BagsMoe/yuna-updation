import Image from 'next/image'

export default function SidebarPreAuth() {
    return (
        <div className='w-1/2 border-none h-full'>
            <Image
                src="/login-sidebar.png"
                alt="Logo"
                width={688}
                height={960}
                className="object-cover h-full rounded-xl"
                priority={true}
            />
        </div>
    )
}