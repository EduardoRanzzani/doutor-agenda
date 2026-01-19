'use client';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon, SaveIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { z } from 'zod';
import { medicalSpecialties } from '../_constants';

const formSchema = z.object({
	name: z.string().trim().nonempty({
		message: 'Nome é obrigatório',
	}),
	specialty: z.string().trim().nonempty({
		message: 'Especialidade é obrigatória',
	}),
	appointmentPrice: z.number().min(1, {
		message: 'Preço da consulta é obrigatório',
	}),
	availableFromWeekDay: z.number(),
	availableToWeekDay: z.number(),
	availableFromTime: z.string().min(1, {
		message: 'Hora de início da consulta é obrigatório',
	}),
	availableToTime: z.string().min(1, {
		message: 'Hora de término da consulta é obrigatório',
	}),
});

const UpsertDoctorForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			specialty: '',
			appointmentPrice: 0,
			availableFromWeekDay: 0,
			availableToWeekDay: 0,
			availableFromTime: '',
			availableToTime: '',
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
	};

	return (
		<DialogContent>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-4'
				>
					<DialogHeader>
						<DialogTitle>Adicionar Médico</DialogTitle>
						<DialogDescription>
							Adicione um novo médico ao sistema.
						</DialogDescription>
					</DialogHeader>

					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nome:</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage className='-mt-1 text-xs' />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='specialty'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Especialidade:</FormLabel>
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
										{medicalSpecialties.map((specialty) => (
											<SelectItem
												key={specialty.value}
												value={specialty.value}
											>
												{specialty.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage className='-mt-1 text-xs' />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='appointmentPrice'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Preço da Consulta:</FormLabel>
								<NumericFormat
									value={field.value}
									onValueChange={(value) => {
										field.onChange(value.floatValue);
									}}
									decimalScale={2}
									fixedDecimalScale
									decimalSeparator=','
									allowNegative={false}
									allowLeadingZeros={false}
									thousandSeparator={'.'}
									customInput={Input}
									prefix='R$'
								/>
								<FormMessage className='-mt-1 text-xs' />
							</FormItem>
						)}
					/>

					<DialogFooter>
						<Button
							type='submit'
							className='w-full'
							disabled={form.formState.isSubmitting}
						>
							{form.formState.isSubmitting ? (
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

export default UpsertDoctorForm;
