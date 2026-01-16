'use client';
import { Button } from '@/components/ui/button';
import { InfoIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function Home() {
	return (
		<div className='flex h-screen w-full items-center justify-center bg-zinc-300'>
			<div className='flex h-100 w-200 flex-col items-center justify-center gap-3 rounded-xl border border-zinc-400 bg-white p-4 shadow-lg'>
				<h1 className='text-2xl font-bold'>Batatas</h1>
				<p className='text-xs text-zinc-500'>
					Algumas batatas são doces e outras não
				</p>

				<Button onClick={() => toast.info('Cliquei no botão!')}>
					<InfoIcon />
					Bootcamp
				</Button>
			</div>
		</div>
	);
}
