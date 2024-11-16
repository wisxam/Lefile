"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Loaders from "../loaders";
import Link from "next/link";
import { createAccount } from "@/lib/actions/user.actions";
import OtpModal from "../otpModal";

type Props = {
	type: string;
};

const authFormSchema = (type: Props) => {
	return z.object({
		email: z.string().email(),
		fullName:
			type.type === "sign-up"
				? z.string().min(3).max(50)
				: z.string().optional(),
	});
};

const errorMessageToast = "Failed to create an account, please try again";

const AuthForm = ({ type }: Props) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [accountId, setAccountId] = useState("");

	const formSchema = authFormSchema({ type });

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullName: "",
			email: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setIsLoading(true);
		setErrorMessage("");
		try {
			const user = await createAccount({
				fullName: values.fullName || "",
				email: values.email,
			});
			setAccountId(user?.accountId);
			// toast.success("OTP request was sent to your email!", {
			// 	style: {
			// 		backgroundColor: "#7F3B3B",
			// 		color: "#DFF6FF",
			// 		fontSize: "12px",
			// 	},
			// 	progressStyle: {
			// 		backgroundColor: "#DFF6FF",
			// 	},
			// });
		} catch (error) {
			setErrorMessage(errorMessageToast);
			// toast.error(errorMessageToast, {
			// 	style: {
			// 		backgroundColor: "#7F3B3B",
			// 		color: "#FFFFFF",
			// 		fontSize: "12px",
			// 	},
			// 	progressStyle: {
			// 		backgroundColor: "#1D1D1D",
			// 	},
			// });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="auth-form">
					<h1 className="form-title">
						{type === "sign-in" ? "Sign In" : "Sign Up"}
					</h1>
					{type === "sign-up" && (
						<FormField
							control={form.control}
							name="fullName"
							render={({ field }) => (
								<FormItem>
									<div className="shad-form-item">
										<FormLabel className="shad-form-label">Full Name</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter the full name"
												{...field}
												className="shad-input"
											/>
										</FormControl>
									</div>
									<FormMessage className="shad-form-message" />
								</FormItem>
							)}
						/>
					)}
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<div className="shad-form-item">
									<FormLabel className="shad-form-label">Email</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter your email"
											{...field}
											className="shad-input"
										/>
									</FormControl>
								</div>
								<FormMessage className="shad-form-message" />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						className="form-submit-button"
						disabled={isLoading}>
						{type === "sign-in" ? "Sign In" : "Sign Up"}
						{isLoading && <Loaders color="white" />}
					</Button>
					{errorMessage && <p className="error-message">*{errorMessage}</p>}
					<div className="body-2 flex justify-center">
						<p className="text-light-100">
							{type === "sign-in"
								? "Don't have an account?"
								: "Already have an account?"}
						</p>
						<Link
							href={type === "sign-in" ? "/sign-up" : "/sign-in"}
							className="ml-1 font-medium text-brand">
							{type === "sign-in" ? "Sign Up" : "Sign In"}
						</Link>
					</div>
				</form>
			</Form>
			{accountId && (
				<div className="otp-modal">
					<OtpModal
						email={form.getValues("email")}
						accountId={accountId}
					/>
				</div>
			)}
		</>
	);
};

export default AuthForm;
