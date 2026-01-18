import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from '@/components/ui/sidebar';
import { ReactNode } from 'react';
import { AppSidebar } from './_components/app-sidebar';

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
	return (
		<SidebarProvider>
			<AppSidebar variant='inset' />
			<SidebarInset>
				<main className='w-full'>
					<SidebarTrigger />
					{children}
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default ProtectedLayout;
