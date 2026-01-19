import {
	PageContainer,
	PageContent,
	PageDescription,
	PageHeader,
	PageHeaderContent,
	PageTitle,
} from '@/components/ui/page-container';
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
		<PageContainer>
			<PageHeader>
				<PageHeaderContent>
					<PageTitle>Dashboard</PageTitle>
					<PageDescription>
						Acesse uma visão detalhada das métricas e atividades de
						pacientes
					</PageDescription>
				</PageHeaderContent>
			</PageHeader>
			<PageContent>
				<h1>{session?.user.name}</h1>
			</PageContent>
		</PageContainer>
	);
};

export default DashboardPage;
