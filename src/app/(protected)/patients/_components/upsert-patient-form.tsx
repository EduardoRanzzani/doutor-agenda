'use client';
import { upsertPatient } from '@/actions/upsert-patient';
import { Button } from '@/components/ui/button';
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { patientsTable } from '@/db/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon, SaveIcon } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
	name: z.string().trim().min(1, {
		message: 'Nome é obrigatório',
	}),
	email: z.string().email({
		message: 'Email inválido',
	}),
	phoneNumber: z.string().trim().min(1, {
		message: 'Número de telefone é obrigatório',
	}),
	sex: z.enum(['male', 'female'], {
		required_error: 'Sexo é obrigatório',
	}),
});

interface UpsertPatientFormProps {
	onSuccess?: () => void;
	patient?: typeof patientsTable.$inferSelect;
}

const UpsertPatientForm = ({
	onSuccess,
	patient,
}: UpsertPatientFormProps) => {
	const form = useForm<z.infer<typeof formSchema>>({
		shouldUnregister: true,
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: patient?.name ?? '',
			email: patient?.email ?? '',
			phoneNumber: patient?.phoneNumber ?? '',
			sex: patient?.sex ?? undefined,
		},
	});

	const upsertPatientAction = useAction(upsertPatient, {
		onSuccess: () => {
			onSuccess?.();
			toast.success('Paciente salvo com sucesso!');
			form.reset();
		},
		onError: () => {
			toast.error('Ocorreu um erro ao salvar o paciente');
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		upsertPatientAction.execute({
			...values,
			id: patient?.id,
		});
	};

	return (
		<DialogContent onInteractOutside={(e) => e.preventDefault()}>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-4'
				>
					<DialogHeader>
						<DialogTitle>
							{patient ? `Atualizar ${patient.name}` : 'Adicionar Paciente'}
						</DialogTitle>
						<DialogDescription>
							{patient
								? 'Atualize as informações do paciente selecionado'
								: 'Adicione um novo paciente ao sistema'}
						</DialogDescription>
					</DialogHeader>

					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nome do paciente:</FormLabel>
								<FormControl>
									<Input {...field} placeholder='Informe o nome do paciente' />
								</FormControl>
								<FormMessage className='-mt-1 text-xs' />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email:</FormLabel>
								<FormControl>
									<Input type='email' {...field} placeholder='Informe o e-mail do paciente'/>
								</FormControl>
								<FormMessage className='-mt-1 text-xs' />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='phoneNumber'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Número de telefone:</FormLabel>
								<FormControl>
									<PatternFormat
										format='(##) #####-####'
										mask='_'
										value={field.value}
										onValueChange={(values) => {
											field.onChange(values.value);
										}}
										customInput={Input}
										placeholder='Informe o telefone do paciente'
									/>
								</FormControl>
								<FormMessage className='-mt-1 text-xs' />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='sex'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Sexo:</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className='w-full'>
											<SelectValue placeholder='Selecione...' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value='male'>Masculino</SelectItem>
										<SelectItem value='female'>Feminino</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage className='-mt-1 text-xs' />
							</FormItem>
						)}
					/>

					<DialogFooter>
						<Button
							type='submit'
							className='w-full'
							disabled={upsertPatientAction.isPending}
						>
							{upsertPatientAction.isPending ? (
								<Loader2Icon className='h-5 w-5 animate-spin' />
							) : (
								<>
									<SaveIcon />
									Salvar
								</>
							)}
						</Button>
					</DialogFooter>
				</form>
			</Form>
		</DialogContent>
	);
};

export default UpsertPatientForm;
