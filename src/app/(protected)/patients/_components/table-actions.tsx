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
import { BanIcon, CheckIcon, MoreVerticalIcon, PenSquareIcon, TrashIcon } from 'lucide-react';
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
