** Work in progress **

This app uses the Discogs API to display my vinyl record collection

Immer returns the a proxy state, so in order to `console.log` state in a reducer wrap it in immer's `current` function, i.e. `console.log(current(state))`
