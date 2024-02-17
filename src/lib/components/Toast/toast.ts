import { toast } from '@zerodevx/svelte-toast';

export function success(message: string) {
	toast.push(message, {
		theme: {
			'--toastBorder': '1px solid #289f28',
			'--toastColor': 'white',
			'--toastBackground': '#79c779',
			'--toastBarBackground': '#289f28'
		}
	});
}

export function failure(message: string) {
	toast.push(message, {
		theme: {
			'--toastBorder': '1px solid #CD001A',
			'--toastColor': 'white',
			'--toastBackground': '#FF7276',
			'--toastBarBackground': '#CD001A'
		}
	});
}

export function information(message: string) {
	toast.push(message, {
		theme: {
			'--toastBorder': '1px solid #03a0d3',
			'--toastColor': 'white',
			'--toastBackground': '#72bcd4',
			'--toastBarBackground': '#03a0d3'
		}
	});
}

export function exclaim(message: string) {
	toast.push(message, {
		theme: {
			'--toastBorder': '1px solid #cdcd1c',
			'--toastColor': 'grey',
			'--toastBackground': '#f9f97f',
			'--toastBarBackground': '#cdcd1c'
		}
	});
}
