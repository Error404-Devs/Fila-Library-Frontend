import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-[90vh]">
        <Link href="/login/elev">
            <h1 className="text-7xl font-bold tracking-widesr">Fila Library</h1>
        </Link>
    </div>
  );
}