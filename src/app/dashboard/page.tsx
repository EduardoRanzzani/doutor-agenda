import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { SignOutButton } from './components/sign-out-button';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { usersToClinicsTable } from '@/db/schema';

const DashboardPage = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user) redirect('/auth');

	// Pegar as clinicas do usuário
	const clinics = await db.query.usersToClinicsTable.findMany({
		where: eq(usersToClinicsTable.userId, session.user.id),
	});

	if (clinics.length === 0) redirect('/clinic-form');

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
