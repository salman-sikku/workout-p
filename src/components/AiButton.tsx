import Link from 'next/link'
import chatAi from '../../public/images/chatAi.png'
import Image from 'next/image'

function AiButton() {
    return (
        <Link
            href='/ai-chat'
            className="fixed bottom-6 sm:bottom-8 md:bottom-10 right-6 sm:right-8 md:right-12 h-11 md:h-12 w-11 md:w-12 rounded-full flex justify-center items-center bg-gradient-to-l from-[#5c5ce6] via-[#3a5ed5] to-[#714dff] p-[10px] md:p-[11px] hover:cursor-pointer hover:scale-105 ease-in-out duration-200">
            <div className='relative w-full h-full'>
                <Image
                    src={chatAi}
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    className='object-contain'
                    alt='fit-img'
                    priority
                />
            </div>
        </Link>

    )
}

export default AiButton