find . -name "*.PNG" -exec mogrify -format webp -scale 800% {} \;
find . -name "*.PNG" -exec rm {} \;