'use client';
import { patientsTable } from '@/db/schema';
import { ColumnDef } from '@tanstack/react-table';
import { PatientTableActions } from './table-actions';

type Patient = typeof patientsTable.$inferSelect;

export const patientTableColumns: ColumnDef<Patient>[] = [
    {
        id: 'name',
        accessorKey: 'name',
        header: 'Nome',
    },
    {
        id: "email",
        accessorKey: 'email',
        header: 'Email',
    },
    {
        id: "phoneNumber",
        accessorKey: "phoneNumber",
        header: "Número de Telefone",
        cell: ({ row }) => {
            const rawNumber = row.original.phoneNumber ?? "";
            const digits = rawNumber.replace(/\D/g, "");
            if (digits.length === 11) {
                const ddd = digits.slice(0, 2);
                const firstPart = digits.slice(2, 7);
                const secondPart = digits.slice(7, 11);
                return `(${ddd}) ${firstPart}-${secondPart}`;
            } else if (digits.length === 10) {
                const ddd = digits.slice(0, 2);
                const firstPart = digits.slice(2, 6);
                const secondPart = digits.slice(6, 10);
                return `(${ddd}) ${firstPart}-${secondPart}`;
            }
            return rawNumber;
        },
    },
    {
        id: 'sex',
        accessorKey: 'sex',
        header: 'Sexo',
        cell: (params) => {
            const patient = params.row.original;
            return patient.sex === 'male' ? 'Masculino' : 'Feminino';
        },
    },
    {
        id: 'actions',
        cell: (params) => {
            const patient = params.row.original;
            return (
                <PatientTableActions patient={patient} />
            );
        }
    }
];