# CheckIt

<!-- [![Build Status - Cirrus][]][Build status] -->[![Twitter handle][]][Twitter badge]

<img align="right" src="public/assets/graphics/logo.svg" height="150px" alt="TBA">

CheckIt is a _minimalist_, _modern_ and _secure_ checklist app for quickly writing down
action points. This project was built using **Next.JS** and is deployed on **Vercel**.

### Features

- Secure by default. No file, network, or environment access needed, unless explicitly
  enabled.

### Install Dependencies

Shell (Mac, Linux):

```sh
pnpm i
```

### Running The Code

Starting CheckIt is as simple as running the following command:

```sh
pnpm i && pnpm start
```

You can also enable optional features by setting the appropriate environment variables:

```js
// LOCALHOST STORAGE
STORAGE_TYPE=LOCAL_STORAGE

// DATABASE STORAGE
STORAGE_TYPE=POSTGRESQL
DATABASE_USER=root
DATABASE_PASS=CENSORED
DATABASE_CONNECTION_STRING=CENSORED
```

### Contributing

We appreciate your help!

To contribute, please read our
[contributing instructions](https://github.com/VladCuciureanu/CheckIt/blob/main/CONTRIBUTING.md).

[build status]: https://github.com/VladCuciureanu/CheckIt/actions
[build status - cirrus]: https://github.com/VladCuciureanu/CheckIt/workflows/ci/badge.svg?branch=main

[twitter handle]: https://img.shields.io/twitter/follow/VladinskiDev.svg?style=social&label=Follow
[twitter badge]: https://twitter.com/intent/follow?screen_name=VladinskiDev
