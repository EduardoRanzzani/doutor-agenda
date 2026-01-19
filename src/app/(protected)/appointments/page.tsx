import {
	PageActions,
	PageContainer,
	PageContent,
	PageDescription,
	PageHeader,
	PageHeaderContent,
	PageTitle,
} from '@/components/ui/page-container';
import AddDoctorButton from '../doctors/_components/add-doctor-button';

const AppointmentsPage = () => {
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
					<AddDoctorButton />
				</PageActions>
			</PageHeader>
			<PageContent>
				<h1>Agendamentos</h1>
			</PageContent>
		</PageContainer>
	);
};

export default AppointmentsPage;
