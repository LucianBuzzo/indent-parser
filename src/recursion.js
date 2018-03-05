const TAB = '  ';

const numTabs = (line, n = 0) =>
	line.startsWith(TAB) ?
		numTabs(line.replace(TAB, ''), n + 1) :
		n

const makeNode = (title = null) => ({
	title,
	isRoot: title === null,
	children: [],
});

const addChildAtDepth = (title, depth, tree) =>
	depth === 0 ?
		(tree.children.push(makeNode(title)), tree) :
		addChildAtDepth(title, depth - 1, tree.children[tree.children.length - 1]);

const transform = ([{ title, depth }, ...rest], tree = makeNode()) =>
	(addChildAtDepth(title, depth, tree), rest.length) ?
		transform(rest, tree) :
		tree;

const parse = function(src) {
	const feed = src.split(/\n/)
		.map(line => ({
			title: line.trimLeft(),
			depth: numTabs(line)
		}));

	return transform(feed);
};

exports.parse = parse;
