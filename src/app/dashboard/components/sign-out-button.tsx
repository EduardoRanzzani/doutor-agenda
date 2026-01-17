'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { Loader2Icon, LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const SignOutButton = () => {
	const router = useRouter();

	return (
		<Button
			className='w-60'
			onClick={() =>
				authClient.signOut({
					fetchOptions: {
						onSuccess: () => {
							router.push('/auth');
						},
					},
				})
			}
		>
			<LogOutIcon /> Sair
		</Button>
	);
};
