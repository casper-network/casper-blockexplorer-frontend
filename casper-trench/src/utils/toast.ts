import { toast } from '@zerodevx/svelte-toast';

export const notifySuccess = (message: string) => {
	toast.push(message, {
		theme: {
			'--toastBackground': '#1098F7',
			'--toastColor': 'white',
			'--toastBarBackground': '#0476C8'
		}
	});
	return null;
};

export const notifyWarning = (message: string) => {
	toast.push(message, {
		theme: {
			'--toastBackground': '#fb923c',
			'--toastColor': 'white',
			'--toastBarBackground': '#f97316'
		}
	});
	return null;
};

export const notifyError = (message: string) => {
	toast.push(message, {
		theme: {
			'--toastBackground': '#DB2955',
			'--toastColor': 'white',
			'--toastBarBackground': '#B5133C'
		}
	});
	return null;
};
