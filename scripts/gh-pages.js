var ghpages = require('gh-pages');

ghpages.publish(
    '__sapper__/export',// <-- replace yourproject with your repo name
    {
        branch: 'master',
        repo: 'https://github.com/cameron-raymond/Website.git',
        user: {
            name: 'cameron-raymond',
            email: 'cameron.raymond@hey.com'
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)

