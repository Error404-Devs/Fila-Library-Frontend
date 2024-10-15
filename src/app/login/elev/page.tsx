import Link from 'next/link';
import { LoginForm } from './LoginForm';
import { Button } from '@/components/ui/button';

const LoginElev = () => {
    return (
        <div className="flex justify-center items-center h-[90vh]">
            <LoginForm />

            <div className="absolute right-8 bottom-8 text-md">
                <Link href="/login/bibliotecara">
                    <Button className="w-40 h-10 rounded-xl bg-[#2b3167] border dark:border-white border-transparent text-white">
                        Bibliotecara?
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default LoginElev;
