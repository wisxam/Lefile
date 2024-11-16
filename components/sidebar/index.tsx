"use client";

import { LefileLogo } from "@/app/assets";
import { navItems } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
// import { cn } from "@/lib/utils";
import { User2 } from "lucide-react";

type Props = {
	fullName: string;
	avatar: string;
	email: string;
};

const Sidebar = ({ fullName, avatar, email }: Props) => {
	const pathname = usePathname();
	return (
		<aside className="remove-scrollbar overflow-auto hidden sm:block">
			<Link
				href=""
				className="flex justify-center items-center">
				<Image
					src={LefileLogo}
					alt="logo"
					className="mt-4 w-[80px] md:w-[120px] hover:-rotate-12 transition-all"
				/>
			</Link>
			<nav className="sidebar-nav">
				<ul className="flex flex-1 flex-col gap-6">
					{navItems.map(({ url, icon, title }) => {
						const IconComponent = icon;
						const active = pathname === url || pathname.startsWith(url);
						return (
							// <Link
							// 	key={title}
							// 	href={url}
							// 	className='md:w-56 m-2'>
							// 	<li className={cn("sidebar-nav-item", active && "shad-active")}>
							// 		<IconComponent
							// 			className={cn("nav-icon", active && "nav-icon-active")}
							// 		/>
							// 		<p className='hidden lg:block'>{title}</p>
							// 	</li>
							// </Link>
							<li key={title}>
								<Link href={url}>
									<button
										className={`${
											active
												? "bg-brand rounded-full shadow-2xl border-none hover:bg-brand-100 "
												: "rounded-full border-none bg-slate-100 hover:shadow-xl "
										}transition-all h-14 mx-5 p-2 lg:w-56 md:w-44`}>
										<div className="flex">
											<span className="lg:px-4 md:px-2 px-3">
												<IconComponent
													className={`${active ? "text-white" : "text-brand"}`}
												/>
											</span>
											<span
												className={`${
													active ? "text-white" : "text-black"
												} tracking-widest text-xl hidden md:block`}>
												{title}
											</span>
										</div>
									</button>
								</Link>
							</li>
						);
					})}
					<div className="sidebar-user-info lg:w-56 md:w-44 mx-5 mb-4 h-14">
						<User2
							size={20}
							className="w-10"
						/>
						<div className="hidden lg:block">
							<p className="subtitle-2 capitalize tracking-wider">{fullName}</p>
							<p className="caption tracking-wider">{email}</p>
						</div>
					</div>
				</ul>
			</nav>
		</aside>
	);
};

export default Sidebar;
