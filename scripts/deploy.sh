echo "😤  👊  Updating year 😤  👊"
sed -i -e 's|year =.*|year = "'$(date +%y)'";|g' ./src/components/Footer.svelte
echo "😤  👊  Updating month 😤  👊"
sed -i -e 's|month =.*|month = "'$(date +%B)'";|g' ./src/components/Footer.svelte
echo "🎉  🎊  Updating day 🎉  🎊"
sed -i -e 's|day =.*|day = "'$(date +%d)'";|g' ./src/components/Footer.svelte
rm ./src/components/Footer.svelte-e
git add .
git commit -m "Deployed on $(date +"%m-%d-%y")"
git push
echo "🍻  🥂  Deploying 🍻  🥂"