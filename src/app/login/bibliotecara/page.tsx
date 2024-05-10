import Link from 'next/link';
import { LoginForm } from './LoginForm';

const LoginElev = () => {
    return (
        <div className="flex justify-center items-center h-[90vh]">
            <LoginForm />

            <div className="absolute right-8 bottom-8 text-md">
                <Link href="elev">Elev?</Link>
            </div>
        </div>
    );
};

export default LoginElev;
