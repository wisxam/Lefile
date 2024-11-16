"use client";

import React, { useState } from "react";

import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { LefileLogo } from "@/app/assets";
import { usePathname } from "next/navigation";
import { LogOut, MenuIcon, UserIcon, X } from "lucide-react";
import { Separator } from "../ui/separator";
import { navItems } from "@/constants";
import Link from "next/link";
import { Button } from "../ui/button";
import FileUploader from "../fileUploader";
import { signOutUser } from "@/lib/actions/user.actions";

type Props = {
	avatar: string;
	accountId: string;
	fullName: string;
	email: string;
	ownerId: string;
};

const MobileNavigation = ({
	avatar,
	accountId,
	fullName,
	email,
	ownerId,
}: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	const pathname = usePathname();

	const handleSignOut = async () => {
		await signOutUser();
	};

	return (
		<header className="mobile-header">
			<Image
				src={LefileLogo}
				alt="logo"
				className="mt-4 w-[80px] md:w-[120px] hover:-rotate-12 transition-all h-[80px]"
			/>
			<Sheet
				open={isOpen}
				onOpenChange={setIsOpen}>
				<SheetTrigger>
					{isOpen ? (
						<X size={25} />
					) : (
						<MenuIcon
							size={25}
							className="transition-all"
						/>
					)}
				</SheetTrigger>
				<SheetContent className="h-screen px-3">
					<SheetTitle>
						<div className="header-user">
							{avatar ? (
								<UserIcon size={40} />
							) : (
								<Image
									src={avatar}
									alt="avatar"
									className="rounded-full"
									width={40}
									height={40}
								/>
							)}
							<div className="sm:hidden lg:block">
								<p className="subtitle-2  tracking-wider">{fullName}</p>
								<p className="caption tracking-wider">{email}</p>
							</div>
						</div>
						<Separator className="mb-4 bg-light-200/20" />
					</SheetTitle>
					<nav className="mobile-nav">
						<ul className="mobile-nav-list">
							{navItems.map(({ url, icon, title }) => {
								const IconComponent = icon;
								const active = pathname === url || pathname.startsWith(url);
								return (
									<li key={title}>
										<Link href={url}>
											<button
												className={`${
													active
														? "bg-brand rounded-full shadow-2xl border-none hover:bg-brand-100 "
														: "rounded-full border-none bg-slate-100 hover:shadow-xl "
												}transition-all h-14 px-6 w-full`}>
												<div className="flex">
													<span className="lg:px-4 md:px-2 px-3">
														<IconComponent
															className={`${
																active ? "text-white" : "text-brand"
															}`}
														/>
													</span>
													<span
														className={`${
															active ? "text-white" : "text-black"
														} tracking-widest text-xl`}>
														{title}
													</span>
												</div>
											</button>
										</Link>
									</li>
								);
							})}
						</ul>
					</nav>
					<Separator className="my-5 bg-light-200/20" />
					<div className="flex flex-col justify-between gap-5 pb-5">
						<FileUploader
							ownerId={ownerId}
							accountId={accountId}
						/>
						<Button
							type="submit"
							className="mobile-sign-out-button"
							onClick={handleSignOut}>
							<LogOut size={25} />
							<p>Logout</p>
						</Button>
					</div>
				</SheetContent>
			</Sheet>
		</header>
	);
};
export default MobileNavigation;
