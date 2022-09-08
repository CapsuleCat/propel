# @capsule-cat/propel-forward

Opinionated framework built on top of `@capsule-cat/propel-server`.

## What's included

* `dotenv-safe` - automatically load in env-vars based on an expected `.env.example`. Both a `.env.example` and `.env` are expected at your project root.
* `debug` - A `Logger` service is automatically injected into your `@capsule-cat/propel-server` dependency injection bottle. It will expect a `APP_NAMESPACE` env-var to be set to configure the service, and will expect you to create an `ExceptionLogger` service to report any application errors.

## How to use

Add the following import as the first import of your application:

```ts
import "@capsule-cat/propel-forward/bootstrap";
```

When starting your application, we recommend running with `DEBUG=propel:forward,YOUR_APP_NAMESPACE:*` passed in either
through the command line or in your `.env` file.
