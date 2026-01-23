import { DataTable } from '@/components/ui/data-table';
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
import { appointmentsTable, doctorsTable, patientsTable } from '@/db/schema';
import { auth } from '@/lib/auth';
import { asc, desc, eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import AddAppointmentButton from './_components/add-appointment-button';
import { appointmentTableColumns } from './_components/table-columns';

const AppointmentsPage = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user) redirect('/auth');
	if (!session.user.clinic) redirect('/clinic-form');

	const [patients, doctors, appointments] = await Promise.all([
		db.query.patientsTable.findMany({
			where: eq(patientsTable.clinicId, session.user.clinic.id),
			orderBy: asc(patientsTable.name),
		}),
		db.query.doctorsTable.findMany({
			where: eq(doctorsTable.clinicId, session.user.clinic.id),
			orderBy: asc(doctorsTable.name),
		}),
		db.query.appointmentsTable.findMany({
			where: eq(appointmentsTable.clinicId, session.user.clinic.id),
			orderBy: desc(appointmentsTable.date),
			with: {
				patient: true,
				doctor: true,
			},
		}),
	]);

	return (
		<PageContainer>
			<PageHeader>
				<PageHeaderContent>
					<PageTitle>Agendamentos</PageTitle>
					<PageDescription>
						Gerencie os agendamentos da sua clínica
					</PageDescription>
				</PageHeaderContent>
				<PageActions>
					<AddAppointmentButton patients={patients} doctors={doctors} />
				</PageActions>
			</PageHeader>
			<PageContent>
				<DataTable data={appointments} columns={appointmentTableColumns} />
			</PageContent>
		</PageContainer>
	);
};

export default AppointmentsPage;
