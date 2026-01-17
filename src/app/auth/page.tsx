import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { SignUpForm } from './components/sign-up-form';
import { SignInForm } from './components/sign-in-form';

const AuthenticationPage = () => {
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
