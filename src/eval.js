const getPrefix = (val) => {
	let match = val.match(/^\s+/);
	let prefix = match ? match[0] : '';
	return prefix;
};

const makeNodeString = (title, isRoot = false) =>
	`{ title: ${title}, isRoot: ${isRoot}, children: [`;

var parse = function(src) {
	const lines = src.split(/\n/);
	const res = [];
	lines.forEach((line, i) => {
		const prefix = getPrefix(line);

		res.push(makeNodeString(`'${line.trim()}'`));

		let nextLen = i < lines.length - 1 ?
			getPrefix(lines[i + 1]).length : 0;

		if (prefix.length === nextLen) {
			res.push(']},');
		} else if (prefix.length > nextLen) {
			res.push(Array((prefix.length - nextLen) / 2 + 2).join(']},'));
		}
	});

	return eval(`e = ${makeNodeString(null, true)}${res.join('')}]}`);
};

exports.parse = parse;
