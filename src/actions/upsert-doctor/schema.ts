import { z } from 'zod';

export const upsertDoctorSchema = z
	.object({
		id: z.string().uuid().optional(),
		name: z.string().trim().nonempty({
			message: 'Nome é obrigatório',
		}),
		specialty: z.string().trim().nonempty({
			message: 'Especialidade é obrigatória',
		}),
		appointmentPriceInCents: z.number().min(1, {
			message: 'Preço da consulta é obrigatório',
		}),
		availableFromWeekDay: z.number().min(0).max(6),
		availableToWeekDay: z.number().min(0).max(6),
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

export type UpsertDoctorSchema = z.infer<typeof upsertDoctorSchema>;
