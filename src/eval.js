const TAB = '  ';

// The initial split ensures that we only check the leading whitespace
const numTabs = (line = '') => line.split(/\w+/)
	.shift()
	.split(TAB).length - 1

const makeNodeString = (title = null) =>
	`{ title: ${title}, isRoot: ${title === null}, children: [`;

var parse = (src) => {
	const expression = src.split(/\n/)
		.reduce((exp, line, i, lines) =>
			exp +
			makeNodeString(`'${line.trimLeft()}'`) +
			']},'.repeat(Math.max(0, numTabs(line) - numTabs(lines[i + 1]) + 1))
		, `${makeNodeString()}`) + ']}';

	return eval(`e = ${expression}`);
};

exports.parse = parse;
