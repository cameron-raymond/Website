git pull
echo "🎉🎊Updating CNAME🎉🎊"
echo 'cameronraymond.me' > ./build/CNAME
echo "😤👊Updating lastUpdated😤👊"
sed -i -e 's/lastUpdated = \'\''.*\'\'';/lastUpdated = \'\'$(date +"%m-%d-%y")\'';/g' ./src/Components/CaseComponents/Footer/Footer.js
echo "😫👀Pushing😫👀"
git add .
git commit -m "Deployed on $(date +"%m-%d-%y")"
git push
echo "🍻🥂Deploying🍻🥂"