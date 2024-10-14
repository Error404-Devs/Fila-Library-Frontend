'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Ellipsis } from 'lucide-react';


export function AIcard({ AIbooks }:any) {
    
    const [showMore, setShowMore] = useState(false)
    const AIbooksLess  = AIbooks.slice(0, 3);

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '15px',
                flexWrap: 'wrap'
            }}
            className="py-5"
        >
            {AIbooks.length === 0 && (
                <p>Nu aveti carti imprumutate</p>
            )}
            {showMore ? (
                <>
                    {AIbooks.map((book: any, index: number) => (
                        <Card
                        key={book.id}
                        className="w-[22rem] h-auto py-1"  
                        style={{ overflow: 'hidden' }}
                    >
                        <CardHeader
                            className="flex flex-col items-center justify-center text-center p-0 m-0"
                            style={{ height: '100%' }}
                        >
                            <CardTitle
                                style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis', 
                                    textAlign: 'center', 
                                    fontSize: '0.875rem',
                                    whiteSpace: 'normal'  
                                }}
                                className="m-0"
                            >
                                {book.title}
                            </CardTitle>
                            <CardDescription
                                style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',  
                                    textAlign: 'center',
                                    fontSize: '0.75rem',
                                    whiteSpace: 'normal' 
                                }}
                                className="m-0"
                            >
                                {book.author}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    
                    ))}
                </>
            ):(
                <>
                    {AIbooksLess.map((book: any, index: number) => (
                        <Card
                        key={book.id}
                        className="w-[22rem] h-auto py-1"  
                        style={{ overflow: 'hidden' }}
                    >
                        <CardHeader
                            className="flex flex-col items-center justify-center text-center p-0 m-0"
                            style={{ height: '100%' }}
                        >
                            <CardTitle
                                style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis', 
                                    textAlign: 'center', 
                                    fontSize: '0.875rem',
                                    whiteSpace: 'normal'  
                                }}
                                className="m-0"
                            >
                                {book.title}
                            </CardTitle>
                            <CardDescription
                                style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',  
                                    textAlign: 'center',
                                    fontSize: '0.75rem',
                                    whiteSpace: 'normal' 
                                }}
                                className="m-0"
                            >
                                {book.author}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    ))}
                    <Button className='bg-transparent hover:bg-transparent' onClick={() => setShowMore(true)}>
                        <Ellipsis className='text-black'/> 
                    </Button>
                </>
            )}
            
        </div>
    );
}
