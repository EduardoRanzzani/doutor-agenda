'use client';
import { deletePatient } from '@/actions/delete-patient';
import { Button } from "@/components/ui/button";
import { Dialog } from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { patientsTable } from '@/db/schema';
import { MoreVerticalIcon, PenSquareIcon, TrashIcon } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useState } from 'react';
import { toast } from 'sonner';
import UpsertPatientForm from './upsert-patient-form';

interface PatientTableActionsProps {
    patient: typeof patientsTable.$inferSelect;
};

export const PatientTableActions = ({ patient }: PatientTableActionsProps) => {
    const [isUpsertPatientsDialogOpen, setIsUpsertPatientsDialogOpen] = useState<boolean>(false);

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
        <Dialog open={isUpsertPatientsDialogOpen} onOpenChange={setIsUpsertPatientsDialogOpen}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size={'icon'}>
                        <MoreVerticalIcon className={'h-4 w-4'} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>{patient.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setIsUpsertPatientsDialogOpen(true)}>
                        <PenSquareIcon />
                        Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <TrashIcon />
                        Deletar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu >

            <UpsertPatientForm
                key={`${patient.id}-${patient.updatedAt}`}
                patient={{
                    ...patient
                }}
                onSuccess={() => setIsUpsertPatientsDialogOpen(false)}
            />
        </Dialog>
    );
};
