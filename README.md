# Altspace 360 Photo Viewer

## Usage
Load https://altspacevr.github.io/360photos/public/ into a public enclosure in AltspaceVR

### Query Parameters
- **`initialPlaylist`** _A playlist id from YouTube_
  Up to 50 videos will be populated into the jukebox from the YouTube playlist.
  E.g. If you have a YouTube playlist like
  `https://www.youtube.com/watch?v=XFkzRNyygfk&list=RDEMk8jEIzOyB2trfXZrSEVz_Q`
  You can load it into video jukebox like
  `https://video-jukebox.firebaseapp.com/?initialPlaylist=RDEMk8jEIzOyB2trfXZrSEVz_Q`

### Recipes

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
