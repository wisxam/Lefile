import { LogOut } from "lucide-react";
import React from "react";
import Search from "../search";
import FileUploader from "../fileUploader";
import { Button } from "../ui/button";
import { signOutUser } from "@/lib/actions/user.actions";

type Props = {};

const handleSignOut = async () => {
	"use server";
	await signOutUser();
};

const Header = (props: Props) => {
	return (
		<header className="header">
			<Search />
			<div className="header-wrapper">
				<FileUploader />
				<form action={handleSignOut}>
					<Button
						type="submit"
						className="sign-out-button">
						<LogOut size={25} />
					</Button>
				</form>
			</div>
		</header>
	);
};

export default Header;
