import {
	PageActions,
	PageContainer,
	PageContent,
	PageDescription,
	PageHeader,
	PageHeaderContent,
	PageTitle,
} from '@/components/ui/page-container';
import { db } from '@/db';
import { doctorsTable } from '@/db/schema';
import { auth } from '@/lib/auth';
import { asc, eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import AddDoctorButton from './_components/add-doctor-button';
import { DoctorCard } from './_components/doctor-card';

const DoctorsPage = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user) redirect('/auth');
	if (!session.user.clinic) redirect('/clinic-form');

	const doctors = await db.query.doctorsTable.findMany({
		where: eq(doctorsTable.clinicId, session.user.clinic.id),
		orderBy: asc(doctorsTable.createdAt),
	});

	return (
		<PageContainer>
			<PageHeader>
				<PageHeaderContent>
					<PageTitle>Médicos</PageTitle>
					<PageDescription>
						Gerencie os médicos da sua clínica
					</PageDescription>
				</PageHeaderContent>
				<PageActions>
					<AddDoctorButton />
				</PageActions>
			</PageHeader>
			<PageContent>

				{doctors.length > 0 ? (
					<div className='grid grid-cols-3 gap-6'>
						{doctors.map((doctor) => (
							<DoctorCard key={doctor.id} doctor={doctor} />
						))}
					</div>
				) : (
					<div className='flex w-full border rounded-lg p-4 justify-center'>
						<p className='text-sm'>Nenhum resultado encontrado.</p>
					</div>
				)}
			</PageContent>
		</PageContainer>
	);
};

export default DoctorsPage;
