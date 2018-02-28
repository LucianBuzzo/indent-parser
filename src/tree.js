const TAB = '  ';

// The initial split ensures that we only check the leading whitespace
const numTabs = (line) => line.split(/\w+/)
	.shift()
	.split(TAB).length - 1;

class Node {
	constructor(title = null) {
		this.title = title;
		this.isRoot = !title;
		this.children = [];
	}

	getLastChild() {
		return this.children[this.children.length - 1];
	}

	addChild(title) {
		const child = new Node(title, this);
		this.children.push(child);
	}
}

const parse = function(src) {
	const feed = src.split(/\n/)
		.map(line => ({
			title: line.replace(/^\s+/, ''),
			depth: numTabs(line)
		}));

	const tree = new Node();

	while (feed.length) {
		let { title, depth } = feed.shift();
		let head = tree;
		while (depth--) {
			head = head.getLastChild();
		}
		head.addChild(title);
	}

	return tree;
}

exports.parse = parse;
