var getPrefix = (val) => {
	let match = val.match(/^\s+/);
	let prefix = match ? match[0] : '';
	return prefix;
};

var structTransform = (obj, title = null, isRoot = true) => ({
	title,
	isRoot,
	children: Object.keys(obj).map(x => structTransform(obj[x], x, false))
});

var parse = function(src) {
	const arr = src.split(/\n/);
	const res = [];
	arr.forEach((s, i) => {
		const prefix = getPrefix(s);

		res.push(`'${s.trim()}'`);

		let nextLen = i < arr.length - 1 ?
			getPrefix(arr[i + 1]).length : 0;

		res.push(':{');

		if (prefix.length === nextLen) {
			res.push('},');
		} else if (prefix.length > nextLen) {
			res.push('},' + Array((prefix.length - nextLen) / 2 + 1).join('},'));
		}
	});

	const struct = eval(`e = {${res.join('')}}`);
	return structTransform(struct);
};

exports.parse = parse;
