'use client';
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
import { CalendarIcon, ClockIcon, DollarSignIcon } from 'lucide-react';
import { getAvailability } from '../_helpers/availability';
import UpsertDoctorForm from './upsert-doctor-form';

interface DoctorCardProps {
	doctor: typeof doctorsTable.$inferSelect;
}

export const DoctorCard = ({ doctor }: DoctorCardProps) => {
	const names = doctor.name.trim().split(' ');
	const doctorInitials = (
		names.length > 1
			? names[0][0] + names[names.length - 1][0]
			: names[0][0]
	).toUpperCase();

	const availability = getAvailability(doctor);

	return (
		<Card>
			<CardHeader>
				<div className='flex items-center gap-2'>
					<Avatar className='bg-muted h-10 w-10 items-center justify-center'>
						<AvatarFallback>{doctorInitials}</AvatarFallback>
					</Avatar>
					<div>
						<h3 className='text-sm font-medium'>{doctor.name}</h3>
						<p className='text-muted-foreground text-xs'>
							{doctor.specialty}
						</p>
					</div>
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
				<Dialog>
					<DialogTrigger asChild>
						<Button className='w-full'>Ver detalhes</Button>
					</DialogTrigger>
					<UpsertDoctorForm />
				</Dialog>
			</CardFooter>
		</Card>
	);
};
