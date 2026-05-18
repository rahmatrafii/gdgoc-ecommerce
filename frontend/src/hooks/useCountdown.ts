import { useEffect, useMemo, useState } from 'react';

interface CountdownValues {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	isExpired: boolean;
}

function getCountdown(targetDate: string): CountdownValues {
	const targetTime = new Date(targetDate).getTime();
	const now = Date.now();
	const distance = targetTime - now;

	if (distance <= 0) {
		return {
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
			isExpired: true,
		};
	}

	const days = Math.floor(distance / (1000 * 60 * 60 * 24));
	const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
	const minutes = Math.floor((distance / (1000 * 60)) % 60);
	const seconds = Math.floor((distance / 1000) % 60);

	return {
		days,
		hours,
		minutes,
		seconds,
		isExpired: false,
	};
}

export function useCountdown(targetDate: string): CountdownValues {
	const [countdown, setCountdown] = useState<CountdownValues>(() =>
		getCountdown(targetDate),
	);

	useEffect(() => {
		const timer = window.setInterval(() => {
			setCountdown(getCountdown(targetDate));
		}, 1000);

		return () => {
			window.clearInterval(timer);
		};
	}, [targetDate]);

	return useMemo(() => countdown, [countdown]);
}
