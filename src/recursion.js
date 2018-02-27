const TAB = '  ';

const numTabs = (line) => line.split(TAB).length - 1;

const makeNode = (title, isRoot = false) => ({
	title,
	isRoot,
	children: [],
});

const addChildAtDepth = (title, depth, tree) => {
	if (depth === 0) {
		tree.children.push(makeNode(title));
	}

	return depth === 0 ?
		tree :
		addChildAtDepth(title, depth - 1, tree.children[tree.children.length - 1]);
};

const transform = ([{ title, depth }, ...rest], tree) => {
	if (!tree) {
		tree = makeNode(null, true);
	}

	addChildAtDepth(title, depth, tree);

	return rest.length ? transform(rest, tree) : tree;
};

const parse = function(src) {
	const feed = src.split(/\n/)
		.map(line => ({
			title: line.trim(),
			depth: numTabs(line)
		}));

	return transform(feed);
};

exports.parse = parse;
