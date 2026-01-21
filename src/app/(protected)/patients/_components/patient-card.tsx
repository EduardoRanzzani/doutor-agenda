'use client';
import { deletePatient } from '@/actions/delete-patient';
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
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { patientsTable } from '@/db/schema';
import { AvatarFallback } from '@radix-ui/react-avatar';
import {
	BanIcon,
	CheckIcon,
	EyeIcon,
	PhoneIcon,
	TrashIcon,
	UserIcon
} from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useState } from 'react';
import { toast } from 'sonner';
import UpsertPatientForm from './upsert-patient-form';

interface PatientsCardProps {
	patient: typeof patientsTable.$inferSelect;
}

export const PatientCard = ({ patient }: PatientsCardProps) => {
	const [isUpsertPatientsDialogOpen, setIsUpsertPatientsDialogOpen] =
		useState<boolean>(false);

	const names = patient.name.trim().split(' ');
	const patientInitials = (
		names.length > 1
			? names[0][0] + names[names.length - 1][0]
			: names[0][0]
	).toUpperCase();

	const deletePatientAction = useAction(deletePatient, {
		onSuccess: () => {
			toast.success('Paciente deletado com sucesso!');
		},
		onError: () => {
			toast.error('Ocorreu um erro ao deletar o paciente');
		},
	});

	const handleDeletePatientClick = () => {
		if (!patient) return;
		deletePatientAction.execute({ id: patient.id });
	};

	return (
		<Card>
			<CardHeader>
				<div className='flex items-center justify-between gap-2'>
					<Avatar className='bg-muted h-15 w-15 items-center justify-center'>
						<AvatarFallback>{patientInitials}</AvatarFallback>
					</Avatar>
					<div>
						<h3 className='text-sm font-medium'>{patient.name}</h3>
						<p className='text-muted-foreground text-center text-xs'>
							{patient.email}
						</p>
					</div>

					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button variant={'outline'} className='w-6 h-6 border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive'>
								<TrashIcon className={'w-5 h-5'} />
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>
									Tem certeza que deseja deletar esse paciente?
								</AlertDialogTitle>
								<AlertDialogDescription>
									Essa ação não pode ser revertida.
									<br />
									Isso irá deletar o paciente e todas as
									consultas agendadas.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>
									<BanIcon />
									Cancelar
								</AlertDialogCancel>

								<AlertDialogAction
									onClick={handleDeletePatientClick}
								>
									<CheckIcon />
									Deletar
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</CardHeader>
			<Separator />
			<CardContent className='flex flex-col gap-2'>
				<Badge variant='outline'>
					<PhoneIcon className='mr-1' />
					{patient.phoneNumber}
				</Badge>
				<Badge variant={'outline'}>
					<UserIcon className='mr-1' />
					{patient.sex}
				</Badge>
			</CardContent>
			<Separator />
			<CardFooter>
				<Dialog
					open={isUpsertPatientsDialogOpen}
					onOpenChange={setIsUpsertPatientsDialogOpen}
				>
					<DialogTrigger asChild>
						<Button className='w-full'>
							<EyeIcon /> Ver detalhes
						</Button>
					</DialogTrigger>
					<UpsertPatientForm
						key={`${patient.id}-${patient.updatedAt}`}
						patient={{
							...patient
						}}
						onSuccess={() => setIsUpsertPatientsDialogOpen(false)}
					/>
				</Dialog>
			</CardFooter>
		</Card>
	);
};
