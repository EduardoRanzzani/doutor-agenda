'use client';

import { deletePatient } from '@/actions/delete-patient';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { patientsTable } from '@/db/schema';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { BanIcon, CheckIcon, MoreVerticalIcon, PenSquareIcon, TrashIcon } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { toast } from 'sonner';

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
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size={'icon'}>
                            <MoreVerticalIcon className={'h-4 w-4'} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>{patient.name}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <PenSquareIcon />
                            Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <TrashIcon />
                            Deletar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu >);
        }
    }
];