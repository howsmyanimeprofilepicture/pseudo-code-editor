echo "hi"
rm docs -rf
npx parcel build \
    --public-url /pseudo-code-editor\
    --dist-dir docs