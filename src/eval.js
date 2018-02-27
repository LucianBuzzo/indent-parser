const TAB = '  ';

// The initial split ensures that we only check the leading whitespace
const numTabs = (line) => line ? line.split(/\w+/)
	.shift()
	.split(TAB).length - 1
	: 0;

const makeNodeString = (title, isRoot = false) =>
	`{ title: ${title}, isRoot: ${isRoot}, children: [`;

var parse = (src) => {
	const expression = src.split(/\n/)
		.reduce((exp, line, i, lines) => {
			exp += makeNodeString(`'${line.replace(/^\s+/, '')}'`);

			const tabs = numTabs(line);
			const nextTabs = numTabs(lines[i + 1]);

			if (tabs >= nextTabs) {
				exp += ']},'.repeat(tabs - nextTabs + 1)
			}

			return exp;
		}, `${makeNodeString(null, true)}`) + ']}';

	return eval(`e = ${expression}`);
};

exports.parse = parse;
