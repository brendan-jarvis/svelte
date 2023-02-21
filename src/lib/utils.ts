export const typewriter = (node: HTMLParagraphElement, { speed = 1 }: { speed: number }) => {
	const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

	if (!valid || node.textContent === null) {
		throw new Error(`This transition only works on elements with a single text node child`);
	}

	const text = node.textContent;
	const duration = text.length / (speed * 0.2);

	return {
		duration,
		tick: (t: number) => {
			const i = Math.trunc(text.length * t);
			node.textContent = text.slice(0, i);
		}
	};
};

export const formatDate = (timestamp: number): string => {
	const date = new Date(timestamp * 1000);
	const now = new Date();
	const diff = (now.getTime() - date.getTime()) / 1000; // time difference in seconds
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};

	if (diff < 3600) {
		const minutes = Math.floor(diff / 60);
		if (minutes === 1) {
			return `${minutes} minute ago`;
		}
		return `${minutes} minutes ago`;
	} else if (diff < 86400) {
		const hours = Math.floor(diff / 3600);
		if (hours === 1) {
			return `${hours} hour ago`;
		}
		return `${hours} hours ago`;
	} else {
		return date.toLocaleDateString('en-NZ', options);
	}
};
