import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import * as booksData from "./data.json"
  

export function StudentStatus() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px', 
            flexWrap: 'wrap'
        }}
        className="py-10" 
        >
           
            {booksData.map((book, index: number) => (
                 <Dialog>
                    <DialogTrigger asChild>
                        <Card key={index} className="w-[20rem]" style={{ overflow: 'hidden' }}>
                            <CardHeader className="pt-5">
                                <CardTitle style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} className="py-1">
                                    {book.titlu}
                                </CardTitle>
                                <CardDescription style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {book.autor}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    Status: {book.status}
                                </p>
                            </CardContent>
                            <CardFooter>
                                <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    Data: {book.data}
                                </p>
                            </CardFooter>
                        </Card>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle className="text-xl">{book.titlu}</DialogTitle>
                            <DialogDescription>{book.autor}</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-left text-md">    
                                    Status:
                                </Label>
                                <p>{book.status}</p>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-left  text-md">
                                    Data:
                                </Label>
                                <p>{book.data}</p>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            ))}
        </div>
    );
}
