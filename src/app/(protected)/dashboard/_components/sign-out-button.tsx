'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { Loader2Icon, LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const SignOutButton = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter();

	const signOut = async () => {
		await authClient.signOut({
			fetchOptions: {
				onRequest: () => {
					setLoading(true);
				},
				onSuccess: () => {
					router.push('/auth');
					setLoading(false);
				},
			},
		});
	};

	return (
		<Button className='w-60' disabled={loading} onClick={signOut}>
			{loading ? (
				<Loader2Icon className='h-5 w-5 animate-spin' />
			) : (
				<>
					<LogOutIcon /> Sair
				</>
			)}
		</Button>
	);
};
