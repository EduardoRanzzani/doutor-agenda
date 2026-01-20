'use client';
import { deleteDoctor } from '@/actions/delete-doctor';
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
import { doctorsTable } from '@/db/schema';
import { formatCurrencyInCents } from '@/helpers/currency';
import { AvatarFallback } from '@radix-ui/react-avatar';
import {
	BanIcon,
	CalendarIcon,
	CheckIcon,
	ClockIcon,
	DollarSignIcon,
	EyeIcon,
	TrashIcon,
} from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useState } from 'react';
import { toast } from 'sonner';
import { getAvailability } from '../_helpers/availability';
import UpsertDoctorForm from './upsert-doctor-form';

interface DoctorCardProps {
	doctor: typeof doctorsTable.$inferSelect;
}

export const DoctorCard = ({ doctor }: DoctorCardProps) => {
	const [isUpsertDoctorDialogOpen, setIsUpsertDoctorDialogOpen] =
		useState<boolean>(false);

	const names = doctor.name.trim().split(' ');
	const doctorInitials = (
		names.length > 1
			? names[0][0] + names[names.length - 1][0]
			: names[0][0]
	).toUpperCase();

	const availability = getAvailability(doctor);

	const deleteDoctorAction = useAction(deleteDoctor, {
		onSuccess: () => {
			toast.success('Médico deletado com sucesso!');
		},
		onError: () => {
			toast.error('Ocorreu um erro ao deletar o médico');
		},
	});

	const handleDeleteDoctorClick = () => {
		if (!doctor) return;
		deleteDoctorAction.execute({ id: doctor.id });
	};

	return (
		<Card>
			<CardHeader>
				<div className='flex items-center justify-between gap-2'>
					<Avatar className='bg-muted h-10 w-10 items-center justify-center'>
						<AvatarFallback>{doctorInitials}</AvatarFallback>
					</Avatar>
					<div>
						<h3 className='text-sm font-medium'>{doctor.name}</h3>
						<p className='text-muted-foreground text-center text-xs'>
							{doctor.specialty}
						</p>
					</div>

					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button variant={'outline'} className='w-10'>
								<TrashIcon />
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>
									Tem certeza que deseja deletar esse médico?
								</AlertDialogTitle>
								<AlertDialogDescription>
									Essa ação não pode ser revertida.
									<br />
									Isso irá deletar o médico e todas as
									consultas agendadas.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>
									<BanIcon />
									Cancelar
								</AlertDialogCancel>

								<AlertDialogAction
									onClick={handleDeleteDoctorClick}
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
					<CalendarIcon className='mr-1' />
					{availability.from.format('dddd')} a{' '}
					{availability.to.format('dddd')}
				</Badge>
				<Badge variant={'outline'}>
					<ClockIcon className='mr-1' />
					{availability.from.format('HH:mm')} às{' '}
					{availability.to.format('HH:mm')}
				</Badge>
				<Badge variant={'outline'}>
					<DollarSignIcon className='mr-1' />
					{formatCurrencyInCents(doctor.appointmentPriceInCents)}
				</Badge>
			</CardContent>
			<Separator />
			<CardFooter>
				<Dialog
					open={isUpsertDoctorDialogOpen}
					onOpenChange={setIsUpsertDoctorDialogOpen}
				>
					<DialogTrigger asChild>
						<Button className='w-full'>
							<EyeIcon /> Ver detalhes
						</Button>
					</DialogTrigger>
					<UpsertDoctorForm
						key={`${doctor.id}-${doctor.updatedAt}`}
						doctor={{
							...doctor,
							availableFromTime:
								availability.from.format('HH:mm'),
							availableToTime: availability.to.format('HH:mm'),
						}}
						onSuccess={() => setIsUpsertDoctorDialogOpen(false)}
					/>
				</Dialog>
			</CardFooter>
		</Card>
	);
};
