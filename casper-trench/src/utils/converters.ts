import { getValidator } from './api';
import type { ValidatorDetails } from './types/validator';

export const millisToFormat = (
	diff: number
): {
	seconds: number;
	minutes: number;
	hours: number;
	days: number;
	months: number;
	years: number;
} => {
	let seconds = Math.floor(diff / 1000),
		minutes = Math.floor(seconds / 60),
		hours = Math.floor(minutes / 60),
		days = Math.floor(hours / 24),
		months = Math.floor(days / 30);

	const years = Math.floor(days / 365);

	seconds %= 60;
	minutes %= 60;
	hours %= 24;
	days %= 30;
	months %= 12;

	return {
		seconds,
		minutes,
		hours,
		days,
		months,
		years
	};
};

export const timeAgo = (time: {
	seconds: number;
	minutes: number;
	hours: number;
	days: number;
	months: number;
	years: number;
}): string => {
	let textString = '';
	if (time.years >= 1) {
		textString = `${time.years} ${time.years === 1 ? 'year' : 'years'}`;
	} else if (time.months >= 1) {
		textString = `${time.months} ${time.months === 1 ? 'month' : 'months'}`;
	} else if (time.days >= 1) {
		textString = `${time.days} ${time.days === 1 ? 'day' : 'days'}`;
	} else if (time.hours >= 1) {
		textString = `${time.hours} ${time.hours === 1 ? 'hour' : 'hours'}`;
	} else if (time.minutes >= 1) {
		textString = `${time.minutes} ${time.minutes === 1 ? 'minute' : 'minutes'}`;
	} else {
		textString = `${time.seconds} ${time.seconds === 1 ? 'second' : 'seconds'}`;
	}
	return textString;
};

export const aTimeAgo = (diff: number): string => {
	const time = millisToFormat(diff);

	let textString = '';
	if (time.years >= 1) {
		textString = `${time.years === 1 ? 'a' : time.years} ${time.years === 1 ? 'year' : 'years'}`;
	} else if (time.months >= 1) {
		textString = `${time.months === 1 ? 'a' : time.months} ${
			time.months === 1 ? 'month' : 'months'
		}`;
	} else if (time.days >= 1) {
		textString = `${time.days === 1 ? 'a' : time.days} ${time.days === 1 ? 'day' : 'days'}`;
	} else if (time.hours >= 1) {
		textString = `${time.hours === 1 ? 'an' : time.hours} ${time.hours === 1 ? 'hour' : 'hours'}`;
	} else if (time.minutes >= 1) {
		textString = `${time.minutes === 1 ? 'a' : time.minutes} ${
			time.minutes === 1 ? 'minute' : 'minutes'
		}`;
	} else {
		textString = `${time.seconds === 1 ? 'a' : time.seconds} ${
			time.seconds === 1 ? 'second' : 'seconds'
		}`;
	}
	return textString;
};
export const processType = (type: string): string => {
	switch (type) {
		case 'PUBLIC_KEY_HEX':
			return 'Public Key';
		case 'PUBLIC_KEY_HASH':
			return 'Account Hash';
		case 'BLOCK_HEIGHT':
			return 'Block Height';
		case 'BLOCK_HASH':
			return 'Block Hash';
		case 'DEPLOY_HEX':
			return 'Deploy Hex';
		case 'TRANSFER_HEX':
			return 'Transfer Hex';
		case 'VALIDATOR':
			return 'Validator';
		default:
			return 'Unknown';
	}
};
export const parseStringValue = (value: string): number => {
	return parseFloat(value) / 1000000000;
};

export const getValidatorDetails = async (
	address: string
): Promise<{ name: string; icon: string }> => {
	const validator: ValidatorDetails = await getValidator(address);
	return validator && { name: validator.information?.name, icon: validator.information?.icon };
};
