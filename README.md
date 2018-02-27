Indent parser
---

[![Build Status](https://travis-ci.org/LucianBuzzo/indent-parser.svg?branch=master)](https://travis-ci.org/LucianBuzzo/indent-parser)

An excercise in building parsers that can parse yaml-esque documents into objects.

Given a string like: 

```
page 1
  page 1.1
  page 1.2
    page 1.2.1
page 2
page 3
  page 3.1
  page 3.2
page 4
  page 4.1
    page 4.1.1
      page 4.1.1.1
page 5
```

The following structure should be generated:

```
{
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
}
```
