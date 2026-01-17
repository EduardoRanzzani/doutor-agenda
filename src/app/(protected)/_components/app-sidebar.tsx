import {
	CalendarIcon,
	LayoutDashboardIcon,
	StethoscopeIcon,
	UsersRoundIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import Link from 'next/link';
import { SignOutButton } from '../dashboard/_components/sign-out-button';

// Menu items.
const items = [
	{
		title: 'Dashboard',
		url: '/dashboard',
		icon: LayoutDashboardIcon,
	},
	{
		title: 'Agendamentos',
		url: 'appointments',
		icon: CalendarIcon,
	},
	{
		title: 'Médicos',
		url: 'doctors',
		icon: StethoscopeIcon,
	},
	{
		title: 'Pacientes',
		url: '/patients',
		icon: UsersRoundIcon,
	},
];

export function AppSidebar() {
	return (
		<Sidebar>
			<SidebarHeader className='border-b p-4'>
				<Image
					src={'/logo.svg'}
					alt='Doutor Agenda'
					width={136}
					height={28}
				/>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>Outros</SidebarGroupLabel>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant='outline'
									className='w-full text-left'
								>
									Clínica
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem asChild>
									<SignOutButton />
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
