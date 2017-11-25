# Altspace 360 Photo Viewer

## Usage
Load https://altspacevr.github.io/360photos/public/ into a public enclosure in AltspaceVR

### Query Parameters
- **`collection`** _A url for JSON file containing urls of 360 photos_
  The [default collection](altspacevr.github.io/360photos/public/asvr.json) is a set of (low-res) of AltspaceVR environments and an example of the format.

### Recipes
-
```
https://altspacevr.github.io/360photos/public/?collection=https://altspacevr.github.io/360photos/public/tavern.json
```

## Development
### Setup
The project's packages are managed by npm. Run the following to set up the project:
```
> npm install
```

### Running the dev server
Use Prepros and run this when you make changes
```
> npm build
```

### Releasing
To release a new version, first increment the bundle.js version number in index.html so that we bust our cache.
Then run these commands:

```
> npm run build
> git add .
> git commit -m "it works"
> git push origin master
> git tag v1.0.0
> git push --tags
```
