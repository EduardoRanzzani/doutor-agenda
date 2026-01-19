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

const PatientsPage = () => {
	return (
		<PageContainer>
			<PageHeader>
				<PageHeaderContent>
					<PageTitle>Pacientes</PageTitle>
					<PageDescription>
						Gerencie os pacientes da sua clínica
					</PageDescription>
				</PageHeaderContent>
				<PageActions>
					<AddDoctorButton />
				</PageActions>
			</PageHeader>
			<PageContent>
				<h1>Pacientes</h1>
			</PageContent>
		</PageContainer>
	);
};

export default PatientsPage;
