'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { PlusIcon } from 'lucide-react';
import UpsertDoctorForm from './upsert-doctor-form';

const AddDoctorButton = () => {
	return (
		<Dialog modal>
			<DialogTrigger asChild>
				<Button className='w-full md:w-60'>
					<PlusIcon />
					Novo Médico
				</Button>
			</DialogTrigger>
			<UpsertDoctorForm />
		</Dialog>
	);
};

export default AddDoctorButton;
