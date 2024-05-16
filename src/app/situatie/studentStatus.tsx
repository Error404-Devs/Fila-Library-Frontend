'use client';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
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

import { Label } from '@/components/ui/label';
const baseUrl = process.env.BASE_URL;

export async function StudentStatus({
    searchParams
}: {
    searchParams?: {
        nr_crt?: string;
    };
}) {
    const nr_test = searchParams?.nr_crt;
    console.log(nr_test);
    const nr_crt: string = '12345';
    const url = `${baseUrl}/borrows?person_id=${nr_crt}`;

    console.log(url);
    const response = await fetch(url, { cache: 'no-store' });
    const situatie = await response.json();
    console.log(situatie);

    for (let i = 0; i < situatie.items.length; i++) {
        situatie.items[i].due_date = situatie.items[i].due_date.split('T')[0]; // Update due_date
    }

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
            <p>
                Hello back, {situatie.first_name} {situatie.last_name}
            </p>
            <button onClick={() => console.log(nr_test)}>click</button>
            {situatie.items.map((elev: any, index: number) => (
                <Dialog>
                    <DialogTrigger asChild>
                        <Card
                            key={index}
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
                                    className="py-1"
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
                                {elev.autor_name}
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
                                <p>{elev.status}</p>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="name"
                                    className="text-left  text-md"
                                >
                                    Data:
                                </Label>
                                <p>{elev.due_date}</p>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            ))}
        </div>
    );
}
