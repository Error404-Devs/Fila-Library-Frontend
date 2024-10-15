import Link from 'next/link';
import { LoginForm } from './LoginForm';
import { Button } from '@/components/ui/button';

const LoginElev = () => {
    return (
        <div className="flex justify-center items-center h-[90vh]">
            <LoginForm />

            <div className="absolute right-8 bottom-8 text-md">
                <Link href="/login/elev">
                    <Button className="w-40 h-10 rounded-xl bg-white text-[#2b3167] border border-[#2b3167]">
                        Elev?
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default LoginElev;
