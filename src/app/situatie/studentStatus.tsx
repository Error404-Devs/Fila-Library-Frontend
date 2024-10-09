'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';

import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';
import { useState } from 'react';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export function StudentStatus({ situatie }:any) {
    
    console.log('situatie:',situatie)
    const [showAiRecommended, setShowAiRecommended] = useState(false);

    const showAiRecommendations = async (id: string) => {
        try {
            const response = await fetch(`${baseUrl}/books/recommended?book_id=${id}`)
            if (response.ok) {
                const data = await response.json(); 
                console.log('Recommended books:', data);
            } else {
                console.error(`Error: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error submitting AI recommended request:', error);
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                flexWrap: 'wrap'
            }}
            className="py-10"
        >
            {situatie.items.length === 0 && (
                <p>Nu aveti carti imprumutate</p>
            )}
            {situatie.items.map((elev: any, index: number) => (
                <Dialog key={index} onOpenChange={() => setShowAiRecommended(false)}>
                    <DialogTrigger asChild>
                        <Card
                            className="w-[20rem]"
                            style={{ overflow: 'hidden' }}
                        >
                            <CardHeader className="pt-5">
                                <CardTitle
                                    style={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}
                                    className="py-1 my-3"
                                >
                                    {elev.book_name}
                                </CardTitle>
                                <CardDescription
                                    style={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {elev.author_name}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {elev.status && (
                                    <p
                                        style={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        Status: Imprumtat
                                    </p>
                                )}
                                {!elev.status && (
                                    <p
                                        style={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        Status: Restituit
                                    </p>
                                )}
                            </CardContent>
                            <CardFooter>
                                <p
                                    style={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    Data: {elev.due_date}
                                </p>
                            </CardFooter>
                        </Card>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle className="text-xl">
                                {elev.book_name}
                            </DialogTitle>
                            <DialogDescription>
                                {elev.author_name}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="name"
                                    className="text-left text-md"
                                >
                                    Status:
                                </Label>
                                {!elev.status && (
                                    <p
                                        style={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            width: '200px'
                                        }}
                                    >
                                        Restituit
                                    </p>
                                )}
                                {elev.status && (
                                    <p
                                        style={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            width: '200px'
                                        }}
                                    >
                                        Imprumutat
                                    </p>
                                )}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-left text-md">
                                    Data:
                                </Label>
                                <p className="text-left col-span-3">{elev.due_date}</p>
                            </div>
                            <Button className='hover:bg-[#74AA9C] bg-[#2eb893] mt-4' onClick={() => showAiRecommendations(elev.id)}>
                                <Brain className="mr-2 h-4 w-4" />  Recommend similar books with AI
                            </Button>
                            {showAiRecommended && (
                                <p>carti cu AI</p>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            ))}
        </div>
    );
}
