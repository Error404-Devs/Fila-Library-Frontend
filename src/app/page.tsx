import { Button } from '@/components/ui/button';
import { TypewriterEffect } from '@/components/ui/typewriter-effect';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    const words = [
        {
            text: '„O',
            className: 'text-[#2b3167]'
        },
        {
            text: 'minte',
            className: 'text-[#2b3167]'
        },
        {
            text: 'educată ',
            className: 'text-[#717bf7]'
        },
        {
            text: 'va',
            className: 'text-[#2b3167]'
        },
        {
            text: 'avea',
            className: 'text-[#2b3167]'
        },
        {
            text: 'întotdeauna',
            className: 'text-[#2b3167]'
        },
        {
            text: 'mai',
            className: 'text-[#2b3167]'
        },
        {
            text: 'multe',
            className: 'text-[#2b3167]'
        },
        {
            text: 'întrebări',
            className: 'text-[#717bf7]'
        },
        {
            text: 'decât',
            className: 'text-[#2b3167]'
        },
        {
            text: 'răspunsuri.”',
            className: 'text-[#717bf7]'
        }
    ];

    return (
        <>
            <div className="relative flex flex-col items-center w-full h-screen">
                <Image
                    src="/backgroundtop.svg"
                    alt="Top cover"
                    style={{
                        width: '100%',
                        height: '30%',
                        objectFit: 'cover'
                    }}
                    width={960}
                    height={300}
                />

                <div className="flex flex-col items-center justify-center h-[40rem] ">
                    <div className="flex justify-center items-center">
                        <Image
                            src="/filalogo.png"
                            width={200}
                            height={200}
                            alt="Fila Logo"
                            className="pb-[20px]"
                        />
                        <h1 className="text-7xl font-bold tracking-wider text-[#2b3167] cursor-pointer">
                            Fila Library
                        </h1>
                    </div>
                    <TypewriterEffect words={words} />
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-12">
                        <Link href="/login/bibliotecara">
                            <Button className="w-40 h-10 rounded-xl bg-[#2b3167] border dark:border-white border-transparent text-white">
                                Bibliotecara
                            </Button>
                        </Link>
                        <Link href="/login/elev">
                            <Button className="w-40 h-10 rounded-xl bg-white text-[#2b3167] border border-[#2b3167]">
                                Elev
                            </Button>
                        </Link>
                    </div>
                </div>

                <Image
                    src="/backgroundbottom.svg"
                    alt="Bottom cover"
                    style={{
                        width: '100%',
                        height: '30%',
                        objectFit: 'cover'
                    }}
                    width={960}
                    height={300}
                />
            </div>
        </>
    );
}
