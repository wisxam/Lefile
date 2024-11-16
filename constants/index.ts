import {
	LucideLayoutDashboard,
	FilesIcon,
	Image,
	GalleryHorizontal,
	FileQuestion,
} from "lucide-react";

export const navItems = [
	{
		title: "Dashboard",
		icon: LucideLayoutDashboard,
		url: "/",
	},
	{
		title: "Documents",
		icon: FilesIcon,
		url: "/documents",
	},
	{
		title: "Images",
		icon: Image,
		url: "/images",
	},
	{
		title: "Media",
		icon: GalleryHorizontal,
		url: "/media",
	},
	{
		title: "Others",
		icon: FileQuestion,
		url: "/others",
	},
];

export const defaultAvatar =
	"https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar.png";

export const MAX_FILE_SIZE = 50 * 1024 * 1024;
