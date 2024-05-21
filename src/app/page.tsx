import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <>
        
            <div className="relative flex flex-col items-center w-full h-screen">
                <Image
                    src="/backgroundtop.svg"
                    alt="Top cover"
                    style={{
                        width: '100%',
                        height: '40%',
                        objectFit: 'cover'
                    }}
                    width={960}
                    height={300}
                />

                <div className="h-[20vh] flex justify-center items-center">
                    <Image
                        src="/filalogo.png"
                        width={200}
                        height={200}
                        alt="Fila Logo"
                        className="pb-[20px]"
                    />
                    <Link href="/login/elev">
                        <h1 className="text-7xl font-bold tracking-wider text-[#2b3167] cursor-pointer">
                            Fila Library
                        </h1>
                    </Link>
                </div>

                <Image
                    src="/backgroundbottom.svg"
                    alt="Bottom cover"
                    style={{
                        width: '100%',
                        height: '40%',
                        objectFit: 'cover'
                    }}
                    width={960}
                    height={300}
                />
            </div>
        </>
    );
}
