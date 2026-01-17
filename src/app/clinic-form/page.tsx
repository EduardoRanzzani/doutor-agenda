import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';

import { Loader2Icon, SaveIcon } from 'lucide-react';
import { ClinicForm } from './components/form';

const ClinicFormPage = () => {
	return (
		<Dialog open modal>
			<DialogContent className='sm:max-w-106.25'>
				<DialogHeader>
					<DialogTitle>Adicionar Clínica</DialogTitle>
					<DialogDescription>
						Adicione uma nova clínica para o seu cadastro.
					</DialogDescription>
				</DialogHeader>

				<ClinicForm />
			</DialogContent>
		</Dialog>
	);
};

export default ClinicFormPage;
