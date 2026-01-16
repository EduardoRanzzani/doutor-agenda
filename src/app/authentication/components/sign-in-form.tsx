'use client';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { LogInIcon } from 'lucide-react';



export const SignInForm = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Login</CardTitle>
				<CardDescription>Faça login para continuar.</CardDescription>
			</CardHeader>
			<CardContent className='grid gap-6'></CardContent>
			<CardFooter>
				<Button className='w-40'>
					<LogInIcon /> Entrar
				</Button>
			</CardFooter>
		</Card>
	);
};
