# meteor-madness
NASA Space Apps Oshawa, 2025 Apps Challenge, Hackathon, Ghosts of NGO

## Installation

Install any OS dependent dependencies, (adjust for your specific OS):

```sh
pacman -S git pnpm # example for Arch-based OSes
```

Clone the git repo:

```sh
git clone https://github.com/array-in-a-matrix/meteor-madness
```

Inside the repo folder, install the JavaScript dependencies:

```sh
pnpm install
```

## Run

Ensure the proper API keys are present. Copy the `api-keys-example.json` file and rename it `api-keys.json`.
Then replace the default value with your acutal API key generated from [NASA's site](https://api.nasa.gov/). Currently, there is only one key needed. 

```sh
cp api-keys-example.json api-key.json
```

## Development

To run site in a development environment, run the following:

```sh
pnpx vite
```

## Build

To build the project, built site will be inside the `/dist` directory:

```sh
pnpx vite build
```
