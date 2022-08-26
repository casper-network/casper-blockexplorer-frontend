const getOrCreateTooltip = (chart) => {
	let tooltipEl = chart.canvas.parentNode.querySelector('div');

	if (!tooltipEl) {
		tooltipEl = document.createElement('div');
		tooltipEl.style.background = 'white';
		tooltipEl.style.borderRadius = '8px';
		tooltipEl.style.border = '1px solid #E8E8E8';
		tooltipEl.style.color = '#425466';
		tooltipEl.style.opacity = 1;
		tooltipEl.style.pointerEvents = 'none';
		tooltipEl.style.position = 'absolute';
		tooltipEl.style.transform = 'translate(-50%, 0)';
		tooltipEl.style.transition = 'all .1s ease';

		const table = document.createElement('table');
		table.style.margin = '0px';

		tooltipEl.appendChild(table);
		chart.canvas.parentNode.appendChild(tooltipEl);
	}

	return tooltipEl;
};

export const externalTooltipHandler = (context) => {
	// Tooltip Element
	const { chart, tooltip } = context;
	const tooltipEl = getOrCreateTooltip(chart);

	// Hide if no tooltip
	if (tooltip.opacity === 0) {
		tooltipEl.style.opacity = 0;
		return;
	}

	// Set Text
	if (tooltip.body) {
		const titleLines = tooltip.title || [];

		const bodyLines = tooltip.body.map((b) => b.lines);

		const tableHead = document.createElement('thead');

		titleLines.forEach((title, i) => {
			const date = new Date(title.slice(0, -13).trim());
			const tr = document.createElement('tr');
			tr.style.borderWidth = '0';
			tr.style.textAlign = 'left';
			tr.style.width = '100%';

			const th = document.createElement('th');
			th.style.borderWidth = '0';
			th.style.textAlign = 'left';
			th.style.width = '100%';
			const text = document.createTextNode(
				`${date.getDate().toString().padStart(2, '0')} ${date.toLocaleString('en-us', {
					month: 'short'
				})}`
			);

			th.appendChild(text);
			tr.appendChild(th);
			tableHead.appendChild(tr);
		});

		const tableBody = document.createElement('tbody');
		bodyLines.forEach((body, i) => {
			const colors = tooltip.labelColors[i];
			const bodyData = body.toString().split(' ');

			const span = document.createElement('span');
			span.style.background =
				typeof colors.backgroundColor === 'string'
					? colors.backgroundColor
					: 'linear-gradient(180deg, #099B91 0%, #1737A3 100%)';
			span.style.borderColor =
				typeof colors.borderColor === 'string'
					? colors.borderColor
					: 'linear-gradient(180deg, #099B91 0%, #1737A3 100%)';
			span.style.borderWidth = '2px';
			span.style.marginRight = '10px';
			span.style.borderRadius = '50%';
			span.style.height = '10px';
			span.style.width = '10px';
			span.style.display = 'inline-block';

			const tr = document.createElement('tr');
			tr.style.backgroundColor = 'inherit';
			tr.style.borderWidth = 0;

			const td = document.createElement('td');
			td.style.borderWidth = 0;
			td.style.display = 'flex';
			td.style.justifyContent = 'space-between';
			td.style.alignItems = 'center';
			td.style.width = '100%';

			const leftTextWrapper = document.createElement('div');
			const rightTextWrapper = document.createElement('div');
			leftTextWrapper.style.marginRight = 'auto';
			rightTextWrapper.style.fontWeight = '700';
			rightTextWrapper.style.marginLeft = '10px';

			const textLeft = document.createTextNode(bodyData[0].replace(':', ''));
			const textRight = document.createTextNode(bodyData[1]);

			const left = document.createElement('div');
			left.style.display = 'flex';
			left.style.alignItems = 'center';
			left.style.flexGrow = '1';

			left.appendChild(span);
			leftTextWrapper.appendChild(textLeft);
			left.appendChild(leftTextWrapper);

			const right = document.createElement('bold');

			rightTextWrapper.appendChild(textRight);
			left.appendChild(rightTextWrapper);

			td.appendChild(left);
			td.appendChild(right);
			tr.appendChild(td);
			tableBody.appendChild(tr);
		});

		const tableRoot = tooltipEl.querySelector('table');

		// Remove old children
		while (tableRoot.firstChild) {
			tableRoot.firstChild.remove();
		}

		// Add new children
		tableRoot.appendChild(tableHead);
		tableRoot.appendChild(tableBody);
	}

	const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

	// Display, position, and set styles for font
	tooltipEl.style.opacity = 1;
	tooltipEl.style.left = positionX + tooltip.caretX + 'px';
	tooltipEl.style.top = positionY + tooltip.caretY + 'px';
	tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
};

export const externalSankeyTooltipHandler = (context) => {
	// Tooltip Element
	const { chart, tooltip } = context;
	const tooltipEl = getOrCreateTooltip(chart);

	// Hide if no tooltip
	if (tooltip.opacity === 0) {
		tooltipEl.style.opacity = 0;
		return;
	}

	// Set Text
	if (tooltip.body) {
		const titleLines = tooltip.title || [];

		const bodyLines = tooltip.body.map((b) => b.lines);

		const tableHead = document.createElement('thead');

		titleLines.forEach((title, i) => {
			const date = new Date(title.slice(0, -13).trim());
			const tr = document.createElement('tr');
			tr.style.borderWidth = '0';
			tr.style.textAlign = 'left';
			tr.style.width = '100%';

			const th = document.createElement('th');
			th.style.borderWidth = '0';
			th.style.textAlign = 'left';
			th.style.width = '100%';
			const text = document.createTextNode(
				`${date.getDate().toString().padStart(2, '0')} ${date.toLocaleString('en-us', {
					month: 'short'
				})}`
			);

			th.appendChild(text);
			tr.appendChild(th);
			tableHead.appendChild(tr);
		});

		const tableBody = document.createElement('tbody');
		bodyLines.forEach((body, i) => {
			const colors = tooltip.labelColors[i];
			const bodyData = body.toString().split(' ');

			const tr = document.createElement('tr');
			tr.style.backgroundColor = 'inherit';
			tr.style.borderWidth = 0;

			const td = document.createElement('td');
			td.style.borderWidth = 0;
			td.style.display = 'flex';
			td.style.justifyContent = 'space-between';
			td.style.alignItems = 'center';
			td.style.width = '100%';

			const leftTextWrapper = document.createElement('div');
			const rightTextWrapper = document.createElement('div');
			leftTextWrapper.style.marginRight = 'auto';
			rightTextWrapper.style.marginLeft = '10px';

			const textLeft = document.createTextNode(bodyData[0].replace(':', ''));
			const textRight = document.createTextNode(bodyData[1]);

			const left = document.createElement('div');
			left.style.display = 'flex';
			left.style.alignItems = 'center';
			left.style.flexGrow = '1';

			leftTextWrapper.appendChild(textLeft);
			left.appendChild(leftTextWrapper);

			const right = document.createElement('bold');

			rightTextWrapper.appendChild(textRight);
			left.appendChild(rightTextWrapper);

			td.appendChild(left);
			td.appendChild(right);
			tr.appendChild(td);
			tableBody.appendChild(tr);
		});

		const tableRoot = tooltipEl.querySelector('table');

		// Remove old children
		while (tableRoot.firstChild) {
			tableRoot.firstChild.remove();
		}

		// Add new children
		tableRoot.appendChild(tableHead);
		tableRoot.appendChild(tableBody);
	}

	const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

	// Display, position, and set styles for font
	tooltipEl.style.opacity = 1;
	tooltipEl.style.left = positionX + tooltip.caretX + 'px';
	tooltipEl.style.top = positionY + tooltip.caretY + 'px';
	tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
};
