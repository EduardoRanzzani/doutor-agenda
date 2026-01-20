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
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon, SaveIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { z } from 'zod';
import { medicalSpecialties } from '../_constants';

const formSchema = z
	.object({
		name: z.string().trim().nonempty({
			message: 'Nome é obrigatório',
		}),
		specialty: z.string().trim().nonempty({
			message: 'Especialidade é obrigatória',
		}),
		appointmentPrice: z.number().min(1, {
			message: 'Preço da consulta é obrigatório',
		}),
		availableFromWeekDay: z.string(),
		availableToWeekDay: z.string(),
		availableFromTime: z.string().min(1, {
			message: 'Hora de início da consulta é obrigatório',
		}),
		availableToTime: z.string().min(1, {
			message: 'Hora de término da consulta é obrigatório',
		}),
	})
	.refine(
		(data) => {
			return data.availableFromTime < data.availableToTime;
		},
		{
			message: 'Hora de início não pode ser anterior à hora de término',
			path: ['availableToTime'],
		},
	);

const UpsertDoctorForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			specialty: '',
			appointmentPrice: 0,
			availableFromWeekDay: '1',
			availableToWeekDay: '5',
			availableFromTime: '',
			availableToTime: '',
		},
	});

	const weekDays = [
		{
			label: 'Domingo',
			value: '0',
		},
		{
			label: 'Segunda-feira',
			value: '1',
		},
		{
			label: 'Terça-feira',
			value: '2',
		},
		{
			label: 'Quarta-feira',
			value: '3',
		},
		{
			label: 'Quinta-feira',
			value: '4',
		},
		{
			label: 'Sexta-feira',
			value: '5',
		},
		{
			label: 'Sábado',
			value: '6',
		},
	];

	const morningTimes = [
		{
			label: '05:00',
			value: '05:00',
		},
		{
			label: '05:30',
			value: '05:30',
		},
		{
			label: '06:00',
			value: '06:00',
		},
		{
			label: '06:30',
			value: '06:30',
		},
		{
			label: '07:00',
			value: '07:00',
		},
		{
			label: '07:30',
			value: '07:30',
		},
		{
			label: '08:00',
			value: '08:00',
		},
		{
			label: '08:30',
			value: '08:30',
		},
		{
			label: '09:00',
			value: '09:00',
		},
		{
			label: '09:30',
			value: '09:30',
		},
		{
			label: '10:00',
			value: '10:00',
		},
		{
			label: '10:30',
			value: '10:30',
		},
		{
			label: '11:00',
			value: '11:00',
		},
		{
			label: '11:30',
			value: '11:30',
		},
		{
			label: '12:00',
			value: '12:00',
		},
		{
			label: '12:30',
			value: '12:30',
		},
	];

	const afternoonTimes = [
		{
			label: '13:00',
			value: '13:00',
		},
		{
			label: '13:30',
			value: '13:30',
		},
		{
			label: '14:00',
			value: '14:00',
		},
		{
			label: '14:30',
			value: '14:30',
		},
		{
			label: '15:00',
			value: '15:00',
		},
		{
			label: '15:30',
			value: '15:30',
		},
		{
			label: '16:00',
			value: '16:00',
		},
		{
			label: '16:30',
			value: '16:30',
		},
		{
			label: '17:00',
			value: '17:00',
		},
		{
			label: '17:30',
			value: '17:30',
		},
		{
			label: '18:00',
			value: '18:00',
		},
		{
			label: '18:30',
			value: '18:30',
		},
	];

	const eveningTimes = [
		{
			label: '19:00',
			value: '19:00',
		},
		{
			label: '19:30',
			value: '19:30',
		},
		{
			label: '20:00',
			value: '20:00',
		},
		{
			label: '20:30',
			value: '20:30',
		},
		{
			label: '21:00',
			value: '21:00',
		},
		{
			label: '21:30',
			value: '21:30',
		},
		{
			label: '22:00',
			value: '22:00',
		},
		{
			label: '22:30',
			value: '22:30',
		},
		{
			label: '23:00',
			value: '23:00',
		},
		{
			label: '23:30',
			value: '23:30',
		},
	];

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
									prefix='R$ '
								/>
								<FormMessage className='-mt-1 text-xs' />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='availableFromWeekDay'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Dia Inicial de disponibilidade:
								</FormLabel>
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
										{weekDays.map((dia) => (
											<SelectItem
												key={dia.value}
												value={dia.value}
											>
												{dia.label}
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
						name='availableToWeekDay'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Dia Final de disponibilidade:
								</FormLabel>
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
										{weekDays.map((dia) => (
											<SelectItem
												key={dia.value}
												value={dia.value}
											>
												{dia.label}
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
						name='availableFromTime'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Horário inicial de disponibilidade:
								</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className='w-full'>
											<SelectValue placeholder='Selecione um horário' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Manhã</SelectLabel>
											{morningTimes.map((time) => (
												<SelectItem
													key={time.value}
													value={time.value}
												>
													{time.label}
												</SelectItem>
											))}
										</SelectGroup>
										<SelectGroup>
											<SelectLabel>Tarde</SelectLabel>
											{afternoonTimes.map((time) => (
												<SelectItem
													key={time.value}
													value={time.value}
												>
													{time.label}
												</SelectItem>
											))}
										</SelectGroup>
										<SelectGroup>
											<SelectLabel>Noite</SelectLabel>
											{eveningTimes.map((time) => (
												<SelectItem
													key={time.value}
													value={time.value}
												>
													{time.label}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
									<FormMessage className='-mt-1 text-xs' />
								</Select>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='availableToTime'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Horário final de disponibilidade:
								</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className='w-full'>
											<SelectValue placeholder='Selecione um horário' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Manhã</SelectLabel>
											{morningTimes.map((time) => (
												<SelectItem
													key={time.value}
													value={time.value}
												>
													{time.label}
												</SelectItem>
											))}
										</SelectGroup>
										<SelectGroup>
											<SelectLabel>Tarde</SelectLabel>
											{afternoonTimes.map((time) => (
												<SelectItem
													key={time.value}
													value={time.value}
												>
													{time.label}
												</SelectItem>
											))}
										</SelectGroup>
										<SelectGroup>
											<SelectLabel>Noite</SelectLabel>
											{eveningTimes.map((time) => (
												<SelectItem
													key={time.value}
													value={time.value}
												>
													{time.label}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
									<FormMessage className='-mt-1 text-xs' />
								</Select>
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
