import posts from './blog/_posts.js';

const contents = JSON.stringify(posts.map(post => {
	return {
		title: post.title,
		slug: post.slug,
		emoji: post.emoji,
		tags: post.tags,
		link: post.link,
		blurb: post.blurb,
		date: post.date
	};
}));

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}