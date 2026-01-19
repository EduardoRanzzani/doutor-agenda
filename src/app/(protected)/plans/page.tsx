import {
	PageContainer,
	PageContent,
	PageDescription,
	PageHeader,
	PageHeaderContent,
	PageTitle,
} from '@/components/ui/page-container';

const PlansPage = () => {
	return (
		<PageContainer>
			<PageHeader>
				<PageHeaderContent>
					<PageTitle>Planos</PageTitle>
					<PageDescription>
						Gerencie os Planos da sua clínica
					</PageDescription>
				</PageHeaderContent>
			</PageHeader>
			<PageContent>
				<h1>Planos</h1>
			</PageContent>
		</PageContainer>
	);
};

export default PlansPage;
