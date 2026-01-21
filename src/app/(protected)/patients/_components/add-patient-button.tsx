'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import UpsertPatientForm from './upsert-patient-form';

const AddPatientButton = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button className='w-full md:w-60'>
					<PlusIcon />
					Adicionar Paciente
				</Button>
			</DialogTrigger>
			<UpsertPatientForm onSuccess={() => setIsOpen(false)} />
		</Dialog>
	);
};

export default AddPatientButton;
