"use server";

import { createAdminClient } from "../appwrite";
import { InputFile } from "node-appwrite/file";
import { appWriteConfig } from "../appwrite/config";
import { ID } from "node-appwrite";
import { constructFileUrl, getFileType, parseStringify } from "../utils";
import { revalidatePath } from "next/cache";

const handleError = (error: unknown, message: string) => {
	console.log(error, message);
	throw error;
};

export const uploadFile = async ({
	file,
	ownerId,
	accountId,
	path,
}: UploadFileProps) => {
	const { storage, databases } = await createAdminClient();
	try {
		const inputFile = InputFile.fromBuffer(file, file.name);

		const bucketFile = await storage.createFile(
			appWriteConfig.bucketId,
			ID.unique(),
			inputFile
		);

		const fileDocument = {
			type: getFileType(bucketFile.name).type,
			name: bucketFile.name,
			url: constructFileUrl(bucketFile.$id),
			extension: getFileType(bucketFile.name).extension,
			size: bucketFile.sizeOriginal,
			owner: ownerId,
			accountId,
			users: [],
			bucketFileId: bucketFile.$id,
		};

		const newFile = await databases
			.createDocument(
				appWriteConfig.databaseId,
				appWriteConfig.filesColletionId,
				ID.unique(),
				fileDocument
			)
			.catch(async (error: unknown) => {
				await storage.deleteFile(appWriteConfig.bucketId, bucketFile.$id);
				handleError(error, "failed to create file document");
			});

		revalidatePath(path);
		return parseStringify(newFile);
	} catch (error) {
		handleError(error, "Failed to upload file");
	}
};
