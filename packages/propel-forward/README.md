# @capsule-cat/propel-forward

Set of utilities and pre-made services to quickly get started with writing a server using `@capsule-cat/propel-*` packages.

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
