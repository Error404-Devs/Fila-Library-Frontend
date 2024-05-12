import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export function LoginForm() {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login Elev</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="nrmatricol">Nr. Matricol</Label>
                    <Input
                        id="nrmatricol"
                        type="text"
                        placeholder="39 VIII L"
                        required
                    />
                </div>
            </CardContent>
            <CardFooter>
                <Link className="w-full" href="/situatie" passHref>
                    <Button className="w-full">Sign in</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
