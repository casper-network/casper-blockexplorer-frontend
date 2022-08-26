module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: false, // or 'media' or 'class' => use depending on dark mode approach
	theme: {
		extend: {
			colors: {
				color: {
					'grey-footer-label': '#8F9398',
					'grey-footer-link': '#ADBDCC',
					'grey-footer-title': '#FFF9F5',
					'hover-footer-link': '#099B91',
					'border-header-stats': '#79E1ED',
					'divider-header-stats': '#F2F3F5',
					'title-header-stats': '#CFCFCF',
					'filter-dropdown-button-bg': '#091872',
					'filter-bg': '#09145A',
					'search-btn-blue': '#173FA2',
					'search-btn-green': '#0C8D94',
					'table-header': '#425466',
					'tooltip-border': '#F2F2F2',
					'arcadia-yellow': '#FECA00',
					'arcadia-green': '#31DE91',
					'arcadia-red': '#FF313F',
					'progress-bg': '#D9D9D9',
					'progress-bar': '#0021A5',
					'paginator-border': '#DADADA',
					'black-text': '#1A1919',
					'translucent-green': '#E5F8F6',
					'network-background': '#B8B9B9',
					'translucent-red': '#FFEDEE',
					'translucent-yellow': '#FFFBEA',
					'translucent-blue': '#F5F7FF',
					'arcadia-blue': '#1735A3',
					'contract-header-border': '#D7D7D7',
					'code-background': '#F5F5F5',
					'code-scrollbar': '#E6E6E6',
					'function-browser-bg': '#F8F9FA',
					'query-green': '#F2FEFD',
					'network-background': '#B8B9B9',
					'ago-background': '#F3F3F3',
					'ago-background-2': '#F7F7F7',
					'proof-num-background': '#F6F6F6',
					'copy-btn-bg': '#F4F5F5',
					'translucent-yellow': '#FFFBEA',
					'translucent-blue': '#F5F7FF',
					'arcadia-blue': '#1735A3',
					'chart-blue': '#1737A3',
					'events-header-bg': '#F3FDFC',
					'shadow-black': 'rgba(0,0,0,0.05)',
					'deep-blue-text': '#000030',
					'tranfer-det-green': '#F0FEFF',
					'sender-background': '#F5F6F7',
					'input-border': '#DEDEDE',
					'step-progress-bar-bg': '#E3E3E3',
					'slider-line': '#D3D3D3',
					'transfer-details-border': 'E4E4E4'
				}
			},
			fontFamily: {
				yantramanav: "'Yantramanav', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'"
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
