import React, { useState } from "react";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { X } from "lucide-react";
import Loaders from "../loaders";
import { Button } from "../ui/button";
import { sendEmailOTP, verifySecret } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

type Props = {
	email: string;
	accountId: string;
};

const OtpModal = ({ email, accountId }: Props) => {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(true);
	const [password, setPassword] = useState("");
	const [failedVerified, setFailedVerified] = useState<boolean>();
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setIsLoading(true);
		try {
			const sessionId = await verifySecret({
				accountId,
				password,
			});
			if (sessionId) {
				router.push(`/`);
			}
			setFailedVerified(false);
		} catch (error) {
			setFailedVerified(true);
		}
		setIsLoading(false);
	};

	const handleResendOtp = async () => {
		try {
			await sendEmailOTP({ email });
		} catch (error) {
			console.log(error, "failed to resend otp!");
		}
	};

	return (
		<AlertDialog
			open={isOpen}
			onOpenChange={setIsOpen}>
			<AlertDialogContent className='shad-alert-dialog'>
				<AlertDialogHeader className='relative flex justify-center'>
					<AlertDialogTitle className='h2 text-center'>
						Enter your OTP!
					</AlertDialogTitle>
					<X
						className='otp-close-button'
						onClick={() => setIsOpen(false)}
						height={30}
						width={30}
					/>
					<AlertDialogDescription className='subtitle-2 text-center text-light-100'>
						A code have been sent to your email{" "}
						<span className='pl-1 text-brand tracking-wider'>{email}</span>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<InputOTP
					maxLength={6}
					value={password}
					onChange={setPassword}>
					<InputOTPGroup className='shad-otp'>
						<InputOTPSlot
							index={0}
							className='shad-otp-slot'
						/>
						<InputOTPSlot
							index={1}
							className='shad-otp-slot'
						/>
						<InputOTPSlot
							index={2}
							className='shad-otp-slot'
						/>
						<InputOTPSlot
							index={3}
							className='shad-otp-slot'
						/>
						<InputOTPSlot
							index={4}
							className='shad-otp-slot'
						/>
						<InputOTPSlot
							index={5}
							className='shad-otp-slot'
						/>
					</InputOTPGroup>
				</InputOTP>
				<AlertDialogFooter>
					<div className='flex w-full flex-col gap-4'>
						<AlertDialogAction
							onClick={handleSubmit}
							className='shad-submit-btn h-10'
							disabled={isLoading || password.length < 6}>
							Submit
							{isLoading && <Loaders />}
						</AlertDialogAction>
						{failedVerified && (
							<span className='pl-1 text-brand tracking-wider'>
								OTP code is incorrect.
							</span>
						)}
						<p className='subtitle-2 text-light-100 mt-2 text-center'>
							Didn't recieve a code?
							<Button
								type='button'
								variant='link'
								className='pl-1 text-brand'
								onClick={handleResendOtp}>
								Click to resend
							</Button>
						</p>
					</div>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default OtpModal;
