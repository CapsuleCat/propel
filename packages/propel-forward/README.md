# @capsule-cat/propel-forward

Opinionated framework built on top of `@capsule-cat/propel-server`. This package contains a set of utilities and pre-made services to quickly get started with writing a server using `@capsule-cat/propel-*` packages.

## What's included

* `dotenv-safe` - automatically load in env-vars based on an expected `.env.example`. Both a `.env.example` and `.env` are expected at your project root.
* `debug` - A `Logger` service is automatically injected into your `@capsule-cat/propel-server` dependency injection bottle. It will expect a `APP_NAMESPACE` env-var to be set to configure the service, and will expect you to create an `ExceptionLogger` service to report any application errors.

## Getting Started

To install the package, run the following command:

```bash
npm install --save @capsule-cat/propel-forward
```

This will install the package as a dependency.

## Usage

To use as your entrypoint, import the `init` function from the package and call it with an array of plugins.

```typescript
import { init } from "@capsule-cat/propel-forward";

async function main() {
    await init([
        // Add any Propel plugins here
    ]);
}
```

This will initialize the dependency injection container and any Bootstrap methods.
