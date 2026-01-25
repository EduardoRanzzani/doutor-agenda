'use client';
import { deleteAppointment } from '@/actions/delete-appointment';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BanIcon, CheckIcon, MoreVerticalIcon, TrashIcon } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { toast } from 'sonner';
import type { Appointment } from './table-columns';

interface AppointmentTableActionsProps {
	appointment: Appointment;
}

export const AppointmentTableActions = ({
	appointment,
}: AppointmentTableActionsProps) => {
	const deleteAppointmentAction = useAction(deleteAppointment, {
		onSuccess: () => {
			toast.success('Agendamento deletado com sucesso!');
		},
		onError: () => {
			toast.error('Ocorreu um erro ao deletar o agendamento');
		},
	});

	const handleDeleteAppointmentClick = () => {
		if (!appointment) return;
		deleteAppointmentAction.execute({ id: appointment.id });
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size={'icon'}>
					<MoreVerticalIcon className={'h-4 w-4'} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>
					{appointment.patient.name}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<DropdownMenuItem
							onSelect={(e) => {
								e.preventDefault();
							}}
						>
							<TrashIcon />
							Deletar
						</DropdownMenuItem>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>
								Tem certeza que deseja deletar esse agendamento?
							</AlertDialogTitle>
							<AlertDialogDescription>
								Essa ação não pode ser revertida.
								<br />
								Isso irá deletar o agendamento permanentemente.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>
								<BanIcon />
								Cancelar
							</AlertDialogCancel>
							<AlertDialogAction onClick={handleDeleteAppointmentClick}>
								<CheckIcon />
								Deletar
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
