const { expect } = require('chai');
const parsers = {
	eval: require('../src/eval').parse,
	recursion: require('../src/recursion').parse,
	tree: require('../src/tree').parse
};

const getText = () => "\
page 1\n\
  page 1.1\n\
  page 1.2\n\
    page 1.2.1\n\
page 2\n\
page 3\n\
  page 3.1\n\
  page 3.2\n\
page 4\n\
  page 4.1\n\
    page 4.1.1\n\
      page 4.1.1.1\n\
page 5\
";

const getResult = () => ({
	"title": null,
	"isRoot": true,
	"children": [
		{
			"title": "page 1",
			"isRoot": false,
			"children": [
				{
				"title": "page 1.1",
				"isRoot": false,
				"children": []
			},
			{
				"title": "page 1.2",
				"isRoot": false,
				"children": [
					{
					"title": "page 1.2.1",
					"isRoot": false,
					"children": []
				}
				]
			}
			]
		},
		{
			"title": "page 2",
			"isRoot": false,
			"children": []
		},
		{
			"title": "page 3",
			"isRoot": false,
			"children": [
				{
				"title": "page 3.1",
				"isRoot": false,
				"children": []
			},
			{
				"title": "page 3.2",
				"isRoot": false,
				"children": []
			}
			]
		},
		{
			"title": "page 4",
			"isRoot": false,
			"children": [
				{
					"title": "page 4.1",
					"isRoot": false,
					"children": [
						{
							"title": "page 4.1.1",
							"isRoot": false,
							"children": [
								{
									"title": "page 4.1.1.1",
									"isRoot": false,
									"children": []
								}
							]
						}
					]
				}
			]
		},
		{
			"title": "page 5",
			"isRoot": false,
			"children": []
		}
	]
});

const test = (name, method) => {
	describe(`Using ${name} parser`, function() {
		it('should handle text input', function() {
			expect(method(getText())).to.deep.equal(getResult());
		});

		it('should handle titles with trailing space', function() {
			const source = 'page 1       ';
			const result = {
				title: null,
				isRoot: true,
				children: [{
					title: 'page 1       ',
					isRoot: false,
					children: []
				}]
			};

			expect(method(source)).to.deep.equal(result);
		});

		it('should handle titles with many spaces in the middle', function() {
			const source = 'page        1';
			const result = {
				title: null,
				isRoot: true,
				children: [{
					title: 'page        1',
					isRoot: false,
					children: []
				}]
			};

			expect(method(source)).to.deep.equal(result);
		});
	});
};

Object.keys(parsers).forEach(name => {
	test(name, parsers[name]);
});
