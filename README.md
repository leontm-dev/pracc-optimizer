[powered-image]: https://img.shields.io/badge/Powered%20by-Extension.js-0971fe
[powered-url]: https://extension.js.org

![Powered by Extension.js][powered-image]

# pracc-optimizer Browser extension

> This product is not monetized and not associated with the official pracc.com.

A simple browser extension to optimize your scrim-searching experience on pracc.com

## Installation

### To use

1. Download the latest release
2. Extract the .zip folder
3. Move to your browsers extension manager and turn on "Developer Mode" to unpack local extensions.
4. Select the dist subfolder for your browser out of the extracted .zip
5. Done

### Development

```bash
npx extension@latest create <project-name> --template react
cd <project-name>
npm install
```
## Features

### Basic
- Extract links out of team descriptions
- Generate tracker buttons for available players that also provided their tag

### Requires more setup
- Shows ranks and peaks of players (only with #tag) (**requires region, platform and api-key**)

### Commands for development

### dev

Run the extension in development mode.

```bash
npm run dev
```

### build

Build the extension for production.

```bash
npm run build
```

### preview

Preview the extension in the browser.

```bash
npm run preview
```

## Browser targets (development)

Chromium is the default. You can explicitly target Chrome, Edge, or Firefox:

```bash
# Chromium (default)
npm run dev

# Chrome
npm run dev -- --browser=chrome

# Edge
npm run dev -- --browser=edge

# Firefox
npm run dev -- --browser=firefox
```

## Acknowledgements

This is based on [pracc.com](https://pracc.com). Thanks for the well organized scrim searching side.

Some features also use the [unofficial-valorant-api](https://github.com/Henrik-3/unofficial-valorant-api) by [Hendrik3](https://henrikdev.xyz/). Check out his amazing work. Thanks for your engagement in the VALORANT developer community.

## Author

[@leontm-dev](https://leontm.me)


[![BuyMeACoffee](https://raw.githubusercontent.com/pachadotdev/buymeacoffee-badges/main/bmc-yellow.svg)](https://www.buymeacoffee.com/leontm)

