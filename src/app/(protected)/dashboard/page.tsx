import { db } from '@/db';
import { usersToClinicsTable } from '@/db/schema';
import { auth } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';

const DashboardPage = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user) redirect('/auth');
	if (!session.user.clinic) redirect('/clinic-form');

	return (
		<div className='flex flex-col gap-4 p-4'>
			<div className='flex w-full items-end gap-4'>
				<Image
					src={session?.user?.image || '/default-avatar.png'}
					alt='Imagem do Usuário'
					width={100}
					height={100}
					className='h-20 w-20 rounded-lg border border-zinc-500'
					draggable={false}
				/>
				<h1 className='text-xl font-semibold'>
					Boas vindas {session?.user.name}
				</h1>
			</div>
		</div>
	);
};

export default DashboardPage;
