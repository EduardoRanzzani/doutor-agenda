import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { SignOutButton } from './components/sign-out-button';

const DashboardPage = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user) redirect('/auth');

	return (
		<div className='flex flex-col gap-4 p-4'>
			<h1 className='text-xl font-semibold'>
				Boas vindas {session?.user.name}
			</h1>

			<SignOutButton />
		</div>
	);
};

export default DashboardPage;
