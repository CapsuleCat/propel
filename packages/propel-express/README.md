# @capsule-cat/propel-express

Propel Plugin and decorators to supplement Express usage with `@capsule-cat/propel-server`.

## Getting Started

To install the package, run the following command:

```bash
npm install --save @capsule-cat/propel-express
```

This will install the package as a dependency.

## Usage

Add the Propel Express plugin to the initialization of the `@capsule-cat/propel-forward` package.

```typescript
import { PropelExpressPlugin } from "@capsule-cat/propel-express";
import { init } from "@capsule-cat/propel-forward";

async function main() {
    await init([new PropelExpressPlugin()]);
}
```

This will add Express to the dependency injection container, and will auto-start an Express server on default port 3000 for you.
