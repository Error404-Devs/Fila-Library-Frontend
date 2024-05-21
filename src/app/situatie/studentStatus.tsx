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


export async function StudentStatus({nr_crt}:any) {
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    // const baseUrl = "https://fila-library-backend.onrender.com/api" 

    const url = `${baseUrl}/borrows?person_id=${nr_crt}`;
    const response = await fetch(url, { cache: 'no-store' });
    const situatie = await response.json();
    
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
            <p>Hello back, {situatie.first_name} {situatie.last_name}</p>
            {situatie.items.map((elev: any, index: number) => (
                <Dialog key={index}>
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
                                <p>{elev.status}</p>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="name"
                                    className="text-left text-md"
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
