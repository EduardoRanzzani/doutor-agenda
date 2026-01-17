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
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon, SaveIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const registerSchema = z.object({
	name: z
		.string()
		.trim()
		.nonempty({ message: 'Nome é obrigatório' })
		.min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
	email: z
		.string()
		.trim()
		.email({ message: 'E-mail inválido' })
		.nonempty({ message: 'E-mail é obrigatório' })
		.min(1, { message: 'E-mail é obrigatório' }),
	password: z
		.string()
		.trim()
		.nonempty({ message: 'Senha é obrigatório' })
		.min(8, { message: 'A Senha deve ter pelo menos 8 caracteres' }),
});

export const SignUpForm = () => {
	const router = useRouter();

	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof registerSchema>) => {
		await authClient.signUp.email(
			{
				email: values.email,
				password: values.password,
				name: values.name,
			},
			{
				onSuccess: () => {
					router.push('/dashboard');
					toast.success('Usuário cadastrado com sucesso');
				},
				onError: (error) => {
					let message = error.error.message;
					if (error.error.code === 'USER_ALREADY_EXISTS') {
						message = 'Usuário já cadastrado no sistema';
					}
					toast.error(message);
				},
			},
		);
	};

	return (
		<Card>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-4'
				>
					<CardHeader>
						<CardTitle>Criar conta</CardTitle>
						<CardDescription>
							Crie uma conta para acessar o sistema.
						</CardDescription>
					</CardHeader>

					<CardContent className='space-y-4'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome</FormLabel>
									<FormControl>
										<Input
											placeholder='Digite seu Nome Completo'
											{...field}
										/>
									</FormControl>
									<FormMessage className='-mt-1 text-xs' />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>E-mail</FormLabel>
									<FormControl>
										<Input
											placeholder='Digite seu e-mail'
											{...field}
										/>
									</FormControl>
									<FormMessage className='-mt-1 text-xs' />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Senha</FormLabel>
									<FormControl>
										<Input
											type='password'
											placeholder='Digite sua senha'
											{...field}
										/>
									</FormControl>
									<FormMessage className='-mt-1 text-xs' />
								</FormItem>
							)}
						/>
					</CardContent>

					<CardFooter className='flex justify-end'>
						<Button
							className='w-full'
							type='submit'
							disabled={form.formState.isSubmitting}
						>
							{form.formState.isSubmitting ? (
								<Loader2Icon className='h-5 w-5 animate-spin' />
							) : (
								<span className='flex items-center gap-2'>
									<SaveIcon /> Criar Conta
								</span>
							)}
						</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
};
