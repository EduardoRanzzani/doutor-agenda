'use server';
import { db } from '@/db';
import { doctorsTable } from '@/db/schema';
import { auth } from '@/lib/auth';
import { actionClient } from '@/lib/next-safe-action';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { upsertDoctorSchema } from './schema';

dayjs.extend(utc);

export const upsertDoctor = actionClient
	.schema(upsertDoctorSchema)
	.action(async ({ parsedInput }) => {
		const availableFromTime = parsedInput.availableFromTime; // 08:00:00 -> 12:00:00
		const availableToTime = parsedInput.availableToTime; // 18:00:00 -> 22:00:00

		const availableFromTimeUTC = dayjs()
			.set('hour', parseInt(availableFromTime.split(':')[0]))
			.set('minute', parseInt(availableFromTime.split(':')[1]))
			.set('second', parseInt(availableFromTime.split(':')[2] ?? '00'))
			.utc()
			.format('HH:mm:ss');
		const availableToTimeUTC = dayjs()
			.set('hour', parseInt(availableToTime.split(':')[0]))
			.set('minute', parseInt(availableToTime.split(':')[1]))
			.set('second', parseInt(availableToTime.split(':')[2] ?? '00'))
			.utc()
			.format('HH:mm:ss');

		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session?.user) throw new Error('Unauthorized');
		if (!session.user.clinic?.id) throw new Error('Clinic not found');

		await db
			.insert(doctorsTable)
			.values({
				...parsedInput,
				id: parsedInput.id,
				clinicId: session?.user?.clinic?.id,
				availableFromTime: availableFromTimeUTC,
				availableToTime: availableToTimeUTC,
			})
			.onConflictDoUpdate({
				target: [doctorsTable.id],
				set: {
					...parsedInput,
					availableFromTime: availableFromTimeUTC,
					availableToTime: availableToTimeUTC,
				},
			});

		revalidatePath('/doctors');
	});
