'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { useToast } from '@/components/ui/use-toast';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function EmailForm({ login_id }: any) {
    const [email, setEmail] = useState(''); 
    const [saveButton, setSaveButton] = useState(false);
    const { toast } = useToast();


    const handleSaveEmail = async () => {
        const emailData = { 
            login_id: login_id,
            email: email 
        };
        try {
            const response = await fetch(`${baseUrl}/persons/email`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData)
            });
            if (response.ok) {
                setSaveButton(false);
                console.log(emailData);
                toast({
                    title: 'Email saved',
                    description: `Check ${email} for confirmation. `
                });
            } else {
                console.error(`Error: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error submitting email request:', error);
        }
    };

    return (
        <div className="flex w-full max-w-sm items-center space-x-2">
            {saveButton ? (
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input 
                        type="email" 
                        placeholder="Enter your email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <Button type="submit" onClick={() => handleSaveEmail()}>Save</Button>
                </div>
            ) : (
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input 
                        disabled 
                        type="email" 
                        placeholder="elev@filadeflia.com" 
                        value={email}
                    />
                    <Button type="submit" onClick={() => setSaveButton(true)}>Change</Button>
                </div>
            )}
        </div>
    );
};
