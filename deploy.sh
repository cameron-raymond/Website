git pull
echo 'cameronraymond.me' > ./build/CNAME
sed -i -e 's/lastUpdated = \'\''.*\'\'';/lastUpdated = \'\'$(date +"%m-%d-%y")\'';/g' ./src/Components/CaseComponents/Footer/Footer.js
git add .
git commit -m "Deployed on $(date +"%m-%d-%y")"
git push
