'use client';

import {
	CalendarIcon,
	ChevronRightIcon,
	DiamondIcon,
	GemIcon,
	LayoutDashboardIcon,
	StethoscopeIcon,
	UsersRoundIcon,
} from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
import { authClient } from '@/lib/auth-client';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignOutButton } from '../dashboard/_components/sign-out-button';
import { useEffect, useState } from 'react';
import { AvatarImage } from '@radix-ui/react-avatar';
import { NavUser } from './nav-user';

// Menu items.
const items = [
	{
		title: 'Dashboard',
		url: '/dashboard',
		icon: LayoutDashboardIcon,
	},
	{
		title: 'Agendamentos',
		url: '/appointments',
		icon: CalendarIcon,
	},
	{
		title: 'Médicos',
		url: '/doctors',
		icon: StethoscopeIcon,
	},
	{
		title: 'Pacientes',
		url: '/patients',
		icon: UsersRoundIcon,
	},
];

const others = [
	{
		title: 'Planos',
		url: '/plans',
		icon: GemIcon,
	},
];

export const AppSidebar = ({
	...props
}: React.ComponentProps<typeof Sidebar>) => {
	const session = authClient.useSession();
	const pathname = usePathname();

	// Lógica para detectar o tema
	const { resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// Garante que o componente foi montado no cliente para ler o tema corretamente
	useEffect(() => {
		setMounted(true);
	}, []);

	// Define qual logo usar (default para o light se ainda não montou)
	const logoSrc =
		mounted && resolvedTheme === 'dark'
			? '/logo-dark.svg'
			: '/logo-new.svg';

	return (
		<Sidebar collapsible='offcanvas' {...props}>
			<SidebarHeader className='border-b p-4'>
				<Image
					src={logoSrc}
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
									<SidebarMenuButton
										asChild
										isActive={pathname === item.url}
									>
										<Link
											href={item.url}
											className='flex justify-between'
										>
											<span className='flex items-center gap-2'>
												<item.icon className='h-5 w-5' />
												<p
													className={`${pathname === item.url && 'font-bold'}`}
												>
													{item.title}
												</p>
											</span>
											{pathname === item.url && (
												<ChevronRightIcon />
											)}
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>Outros</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{others.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										asChild
										isActive={pathname === item.url}
									>
										<Link
											href={item.url}
											className='flex justify-between'
										>
											<span className='flex items-center gap-2'>
												<item.icon className='h-5 w-5' />
												<p
													className={`${pathname === item.url && 'font-bold'}`}
												>
													{item.title}
												</p>
											</span>
											{pathname === item.url && (
												<ChevronRightIcon />
											)}
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={session.data?.user} />
			</SidebarFooter>
		</Sidebar>
	);
};

export default AppSidebar;
