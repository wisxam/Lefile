import React from "react";
import { FileAudio, Paperclip, FileStack, FolderCheck } from "lucide-react";

type Props = {
	numberOfObjects: number;
};

const icons = [FileAudio, Paperclip, FileStack, FolderCheck];

const FloatingObjects = ({ numberOfObjects }: Props) => {
	const objects = Array.from({ length: numberOfObjects }, (_, index) => ({
		id: index,
		size: Math.random() * 30 + 10,
		top: Math.random() * 100 + "%",
		left: Math.random() * 100 + "%",
		opacity: Math.random() * 0.2 + 0.1,
		Icon: icons[Math.floor(Math.random() * icons.length)],
	}));

	return (
		<div>
			{objects.map((object) => (
				<div key={object.id}>
					<object.Icon
						className={`absolute animate-float`}
						style={{
							width: object.size,
							height: object.size,
							top: object.top,
							left: object.left,
							opacity: object.opacity,
						}}
					/>
				</div>
			))}
		</div>
	);
};

export default FloatingObjects;
