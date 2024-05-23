import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Number = ({ value }: { value: number | undefined }) => {
    return (
        <Avatar className="bg-blackA1 inline-flex h-[130px] w-[130px] mx-5">
            <AvatarFallback className="text-4xl font-extrabold">
                {value}
            </AvatarFallback>
        </Avatar>
    );
};

export default Number;
