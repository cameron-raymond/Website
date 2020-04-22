var ghpages = require('gh-pages');

ghpages.publish(
    '__sapper__/export',// <-- replace yourproject with your repo name
    {
        branch: 'master',
        repo: 'https://github.com/cameron-raymond/Website.git',
        user: {
            name: 'cameron-raymond',
            email: 'c.raymond@queensu.ca'
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)

