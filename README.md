# Aerodyne (aerodyne)

A Quasar Powered Real-time Messaging App

## This projects uses ***pnpm*** as the package manager

### Install pnpm (Node.js >= v16.13)

```bash
# Node.js >= v16.13
corepack enable

# Run this command if you are using Node.js < v16.17,
# check latest version at https://github.com/pnpm/pnpm/releases/latest
corepack prepare pnpm@<version> --activate
# If you are using Node.js >= v16.17, you can use the following command
corepack prepare pnpm@latest --activate
```

### Install pnpm (Using npm)

```bash
npm install -g pnpm
```

## Install the dependencies

```bash
pnpm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
pnpm run dev-pwa
```

### Lint the files

```bash
pnpm run lint
```

### Format the files

```bash
pnpm run format
```

### Build the app for production

```bash
pnpm run build-pwa
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
