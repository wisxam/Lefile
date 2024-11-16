import React from "react";
import Image from "next/image";
import { Books, CroppedLefile, LefileLogo } from "../assets";
import FloatingObjects from "../../components/floatingObjects";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex min-h-screen transition-all relative'>
			<section className='bg-brand p-10 hidden w-1/2 items-center justify-center lg:flex xl:w-2/5 relative overflow-hidden'>
				<div className='absolute inset-0 pointer-events-none z-0'>
					<FloatingObjects numberOfObjects={200} />
				</div>
				<div className='relative z-10 flex max-h-[800px] max-w-[390px] flex-col space-y-12 items-center'>
					<div className='space-y-5 text-white'>
						<h1 className='h1'>Manage your files the best way!</h1>
						<p className='body-1 '>
							This is a place where you can store all your documents.
						</p>
					</div>
					<Image
						src={Books}
						alt='logo'
						width={300}
						draggable='false'
						className='transition-all hover:rotate-2 hover:scale-105'
					/>
				</div>
			</section>
			<div className='absolute bottom-0 left-0 p-2 flex'>
				<Image
					src={CroppedLefile}
					alt='logo'
					width={28}
					draggable='false'
					height={20}
					className='transition-all hover:rotate-12 hover:scale-125'
				/>
				<div className='text-sm'>LeFile®</div>
			</div>
			<section className='flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0'>
				<div className='mb-3'>
					<Image
						src={LefileLogo}
						width={150}
						alt='logo'
						draggable='false'
						className='flex-center hover:-rotate-12 transition-all'
					/>
				</div>
				{children}
			</section>
		</div>
	);
};

export default Layout;
