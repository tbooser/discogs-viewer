This app uses the Discogs API to display my vinyl record collection

** Work in progress **

https://discogs-viewer.herokuapp.com/

Immer returns the a proxy state, so in order to `console.log` state in a reducer wrap it in immer's `current` function, i.e. `console.log(current(state))`
