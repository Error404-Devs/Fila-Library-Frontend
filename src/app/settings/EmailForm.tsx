'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function EmailForm() 
{
    const [saveButton, setSaveButton] = useState(false)

    const handleSaveEmail = async (login_id: string, email: string) => {
        const emailData = { 
            login_id: login_id,
            email: email
        };
        try {
            const response = await fetch(`${baseUrl}/borrows`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData)
            });
            if (response.ok) {
                setSaveButton(false)    
                // toast({
                //     title: '',
                //     description: ``
                // });
            } else {
                console.error(`Error: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error submitting email request:', error);
        }
    };

    return (
        <div className="flex w-full max-w-sm items-center space-x-2">
            {saveButton && (
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input type="email" placeholder="elev@filadelfia.com"/>
                    <Button type="submit" onClick={() => setSaveButton(false)}>Save</Button>
                </div>
            )}
            {!saveButton && (
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input disabled type="email" placeholder="elev@filadeflia.com"/>
                    <Button type="submit" onClick={() => setSaveButton(true)}>Change</Button>
                </div>
            )}
        </div>
    );
};
