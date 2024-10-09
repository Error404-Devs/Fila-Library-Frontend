'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react";

export default function EmailForm() 
{
    const [saveButton, setSaveButton] = useState(false)

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
