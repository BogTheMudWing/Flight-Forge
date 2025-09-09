find . -name "*.PNG" -exec mogrify -format png -scale 800% {} \;
find . -name "*.PNG" -exec rm {} \;
