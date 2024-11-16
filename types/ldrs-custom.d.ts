declare namespace JSX {
	interface IntrinsicElements {
		"l-tail-chase": React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLElement>,
			HTMLElement
		> & {
			color?: string;
			size?: string | number;
			speed?: string | number;
		};
	}
}
