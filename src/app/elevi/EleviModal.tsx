import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';

export default function EleviModal({ books }: any) {
    if (books.length) {
    }
    return (
        <DialogContent className="max-w-[90vh]">
            <DialogHeader>
                <DialogTitle>Carti Imprumutate</DialogTitle>
            </DialogHeader>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '20px',
                    flexWrap: 'wrap'
                }}
                className="py-10"
            >
                {books.map((elev: any, index: number) => (
                    <Card
                        className="w-[20rem]"
                        style={{ overflow: 'hidden' }}
                        key={index}
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
                ))}
            </div>
        </DialogContent>
    );
}
