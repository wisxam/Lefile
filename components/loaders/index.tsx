import { useEffect } from "react";

export default function Loaders() {
	useEffect(() => {
		async function getLoader() {
			const { spiral } = await import("ldrs");
			spiral.register();
		}
		getLoader();
	}, []);
	return <l-spiral color="coral"></l-spiral>;
}
