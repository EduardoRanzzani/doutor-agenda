'use client';
import { appointmentsTable } from '@/db/schema';
import { formatCurrencyInCents } from '@/helpers/currency';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { AppointmentTableActions } from './table-actions';

export type Appointment = typeof appointmentsTable.$inferSelect & {
	patient: {
		name: string;
	};
	doctor: {
		name: string;
		specialty: string;
	};
};

export const appointmentTableColumns: ColumnDef<Appointment>[] = [
	{
		id: 'patient',
		accessorKey: 'patient.name',
		header: 'Paciente',
		cell: ({ row }) => {
			return row.original.patient.name;
		},
	},
	{
		id: 'doctor',
		accessorKey: 'doctor.name',
		header: 'Médico',
		cell: ({ row }) => {
			return (row.original.doctor.name);
		},
	},
	{
		id: 'date',
		accessorKey: 'date',
		header: 'Data e Hora',
		cell: ({ row }) => {
			const date = row.original.date;
			return dayjs(date).format('DD/MM/YYYY [às] HH:mm');
		},
	},
	{
		id: 'specialty',
		accessorKey: 'doctor.specialty',
		header: 'Especialidade',
		cell: ({ row }) => {
			return row.original.doctor.specialty;
		},
	},
	{
		id: 'appointmentPriceInCents',
		accessorKey: 'appointmentPriceInCents',
		header: 'Valor',
		cell: ({ row }) => {
			return formatCurrencyInCents(row.original.appointmentPriceInCents);
		},
	},
	{
		id: 'actions',
		cell: (params) => {
			const appointment = params.row.original;
			return <AppointmentTableActions appointment={appointment} />;
		},
	},
];
