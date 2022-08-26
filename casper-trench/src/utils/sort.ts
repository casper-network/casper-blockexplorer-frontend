// TODO explore cleaner ways of implementation
export const tableSort = (direction: 'asc' | 'desc', items: {}[], sortElement: string): any => {
	const nestedFields = sortElement.split('.');
	items.sort((a, b) => {
		switch (nestedFields.length) {
			case 1:
				if (typeof a[nestedFields[0]] === 'number') {
					return direction === 'asc'
						? a[nestedFields[0]] - b[nestedFields[0]]
						: b[nestedFields[0]] - a[nestedFields[0]];
				} else if (typeof a[nestedFields[0]] === 'string') {
					return direction === 'asc'
						? a[nestedFields[0]].localeCompare(b[nestedFields[0]])
						: b[nestedFields[0]].localeCompare(a[nestedFields[0]]);
				}
				break;

			case 2:
				if (typeof a[nestedFields[0]][nestedFields[1]] === 'number') {
					return direction === 'asc'
						? a[nestedFields[0]][nestedFields[1]] - b[nestedFields[0]][nestedFields[1]]
						: b[nestedFields[0]][nestedFields[1]] - a[nestedFields[0]][nestedFields[1]];
				} else if (typeof a[nestedFields[0]][nestedFields[1]] === 'string') {
					return direction === 'asc'
						? a[nestedFields[0]][nestedFields[1]].localeCompare(b[nestedFields[0]][nestedFields[1]])
						: b[nestedFields[0]][nestedFields[1]].localeCompare(
								a[nestedFields[0]][nestedFields[1]]
						  );
				}
				break;
			case 3:
				if (typeof a[nestedFields[0]][nestedFields[1]][nestedFields[2]] === 'number') {
					return direction === 'asc'
						? a[nestedFields[0]][nestedFields[1]][nestedFields[2]] -
								b[nestedFields[0]][nestedFields[1]][nestedFields[2]]
						: b[nestedFields[0]][nestedFields[1]][nestedFields[2]] -
								a[nestedFields[0]][nestedFields[1]][nestedFields[2]];
				} else if (typeof a[nestedFields[0]][nestedFields[1]][nestedFields[2]] === 'string') {
					return direction === 'asc'
						? a[nestedFields[0]][nestedFields[1]][nestedFields[2]].localeCompare(
								b[nestedFields[0]][nestedFields[1]][nestedFields[2]]
						  )
						: b[nestedFields[0]][nestedFields[1]][nestedFields[2]].localeCompare(
								a[nestedFields[0]][nestedFields[1]][nestedFields[2]]
						  );
				}
				break;
		}

		// TODO add other types e.g date as needed.
	});
	return items;
};
