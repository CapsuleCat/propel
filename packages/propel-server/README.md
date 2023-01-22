# @capsule-cat/propel-server

Set of utilities and pre-made services to quickly get started with writing a server using `@capsule-cat/propel-*` packages.

## Getting Started

To install the package, run the following command:

```bash
npm install --save @capsule-cat/propel-server
```

This will install the package as a dependency.

## Usage

If you are not using the `@capsule-cat/propel-forward` package, you can use the `propel` function to initialize the dependency injection container:

```typescript
import { propel } from "@capsule-cat/propel-server";

async function main() {
    const instance = propel();

    await instance.init();
}
```
