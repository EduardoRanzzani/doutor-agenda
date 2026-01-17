import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { SignInForm } from './_components/sign-in-form';
import { SignUpForm } from './_components/sign-up-form';

const AuthenticationPage = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session?.user) redirect('/dashboard');

	return (
		<div className='flex h-screen w-screen items-center justify-center'>
			<Tabs defaultValue='login' className='w-100'>
				<TabsList className='grid w-full grid-cols-2'>
					<TabsTrigger value='login'>Login</TabsTrigger>
					<TabsTrigger value='register'>Criar Conta</TabsTrigger>
				</TabsList>

				<TabsContent value='login'>
					<SignInForm />
				</TabsContent>

				<TabsContent value='register'>
					<SignUpForm />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default AuthenticationPage;
