'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { doctorsTable, patientsTable } from '@/db/schema';
import AddAppointmentForm from './add-appointment-form';

interface AddAppointmentButtonProps {
	patients: (typeof patientsTable.$inferSelect)[];
	doctors: (typeof doctorsTable.$inferSelect)[];
}

const AddAppointmentButton = ({
	patients,
	doctors,
}: AddAppointmentButtonProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button className='w-full md:w-60'>
					<PlusIcon />
					Adicionar Agendamento
				</Button>
			</DialogTrigger>
			<AddAppointmentForm
				patients={patients}
				doctors={doctors}
				onSuccess={() => setIsOpen(false)}
			/>
		</Dialog>
	);
};

export default AddAppointmentButton;
