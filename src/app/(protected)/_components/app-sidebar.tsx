'use client';

import {
	CalendarIcon,
	ChevronRightIcon,
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
	SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import Link from 'next/link';
import { SignOutButton } from '../dashboard/_components/sign-out-button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { authClient } from '@/lib/auth-client';
import { usePathname } from 'next/navigation';

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

export const AppSidebar = ({
	...props
}: React.ComponentProps<typeof Sidebar>) => {
	const session = authClient.useSession();
	const pathname = usePathname();

	return (
		<Sidebar collapsible='offcanvas' {...props}>
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
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton
									size='lg'
									className='rounded-lg'
								>
									<Avatar>
										<AvatarFallback>ELR</AvatarFallback>
									</Avatar>
									<div className='-space-y-1'>
										<h1 className='font-bold'>
											{session.data?.user.name}
										</h1>
										<p className='text-muted-foreground text-xs'>
											{session.data?.user.email}
										</p>
									</div>
								</SidebarMenuButton>
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
};

export default AppSidebar;
