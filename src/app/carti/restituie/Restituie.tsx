'use client';

import { ArrowBigLeft, Book, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import RestituieModal from './RestituieModal';

interface RestituieProps {
    bookId: string;
    bookName: string;
    bookAuthor: string;
    bookCategory: string;
    available: number;
    setAvailable: any;
    borrowed: number;
    setBorrowed: any;
}

const Restituie = ({
    bookId,
    bookName,
    bookAuthor,
    bookCategory,
    available,
    setAvailable,
    borrowed,
    setBorrowed
}: RestituieProps) => {
    return (
        <Dialog>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                            <Button
                                variant="outline"
                                className="h-[40px] w-[80px] p-1 mx-2"
                                disabled={borrowed === 0}
                            >
                                <Book className="h-5 w-5" />
                                <ArrowBigLeft className="h-5 w-5" />
                                <div className="relative h-7 w-7">
                                    <UserRound className="static h-6 w-6 mt-1 mr-1" />
                                    <Badge className="absolute top-0 right-0 flex h-4 w-4 p-1 shrink-0 items-center justify-center rounded-full bg-black">
                                        {borrowed}
                                    </Badge>
                                </div>
                            </Button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Restituie</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <DialogContent className="max-w-[90vh]">
                <RestituieModal
                    bookId={bookId}
                    bookName={bookName}
                    bookAuthor={bookAuthor}
                    bookCategory={bookCategory}
                    available={available}
                    setAvailable={setAvailable}
                    borrowed={borrowed}
                    setBorrowed={setBorrowed}
                />
            </DialogContent>
        </Dialog>
    );
};
export default Restituie;
