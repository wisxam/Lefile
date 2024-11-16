"use client";

import { MouseEvent, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../ui/button";
import { cn, convertFileToUrl, getFileType } from "@/lib/utils";
import { TrashIcon, Upload } from "lucide-react";
import Thumbnail from "../thumbnail";
import { MAX_FILE_SIZE } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { uploadFile } from "@/lib/actions/file.actions";
import { usePathname } from "next/navigation";
import Loaders from "../loaders";

type Props = {
	ownerId: string;
	accountId: string;
	className?: string;
};

const FileUploader = ({ ownerId, accountId, className }: Props) => {
	const { toast } = useToast();
	const pathname = usePathname();
	const [files, setFiles] = useState<File[]>();

	const handleRemoveFile = (
		e: MouseEvent<HTMLButtonElement>,
		fileName: string
	) => {
		e.stopPropagation();
		setFiles((prevFiles) =>
			prevFiles?.filter((file) => file.name !== fileName)
		);
	};

	const onDrop = useCallback(
		async (acceptedFiles: File[]) => {
			setFiles(acceptedFiles);
			const uploadPromises = acceptedFiles.map(async (file: File) => {
				if (file.size > MAX_FILE_SIZE) {
					setFiles((prevFiles) =>
						prevFiles?.filter((f) => f.name !== file.name)
					);
					return toast({
						description: (
							<p className="body-2 text-white tracking-widest">
								<span className="font-semibold tracking-widest">
									{file.name}{" "}
								</span>
								is too large. Max file size is 50 MB
							</p>
						),
						className: "error-toast",
					});
				}
				return uploadFile({ file, ownerId, accountId, path: pathname }).then(
					(uploadFile) => {
						if (uploadFile) {
							setFiles((prevFiles) =>
								prevFiles?.filter((f) => f.name !== file.name)
							);
						}
					}
				);
			});
		},
		[ownerId, pathname, accountId]
	);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
	return (
		<div
			{...getRootProps()}
			className="cursor-pointer">
			<input {...getInputProps()} />
			<Button
				className={cn("uploader-button", className)}
				type="button">
				<Upload size={35} />
				<p>Upload</p>
			</Button>
			{files && files?.length > 0 && (
				<ul className="uploader-preview-list">
					<h4 className="h4 text-light-100">Uploading</h4>
					{files.map((file, index) => {
						const { type, extension } = getFileType(file.name);
						const isLastIndex = index === files.length - 1;
						return (
							<li
								key={`${file.name}-${index}`}
								className="uploader-preivew-item">
								<div className="flex items-center justify-between shadow-sm rounded-md">
									<div className="flex items-center">
										<Thumbnail
											type={type}
											extension={extension}
											url={convertFileToUrl(file)}
										/>
										<div className="flex flex-col">
											<p className="preview-item-name tracking-wider mx-4">
												{file.name}
											</p>
											<div className="mx-4">
												<Loaders />
											</div>
										</div>
									</div>
									<div className="hover:rotate-12 transition-all hover:text-rose-800 duration-100">
										<TrashIcon
											onClick={(e: React.MouseEvent<SVGSVGElement>) => {
												handleRemoveFile(
													e as unknown as React.MouseEvent<HTMLButtonElement>,
													file.name
												);
											}}
										/>
									</div>
								</div>
								{files.length > 1 && !isLastIndex && (
									<hr className="mt-4 bg-light-200/20" />
								)}
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};

export default FileUploader;
