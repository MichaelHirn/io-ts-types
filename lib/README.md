<h1 align="left">
io-ts-types for <a href="https://github.com/denoland/deno">Deno 🦕</a>
</h1>

[io-ts-types](https://github.com/gcanti/io-ts-types) is a library for codecs and combinators for use with io-ts.

Unfortunately io-ts-types is not available for Deno, because:

1. io-ts's Gcanti does not want to support Deno (yet)
2. Esm.sh keeps breaking and doesn't support all types (Jul 2022)
3. Skypack fails to support io-ts (Jul 2022)

This repo is the first working Deno port I am aware of. Feel free to open an issue here if you experience any problems.

> the monocle-ts and newtypes-ts dependencies are removed, i.e. `getLenses` and `fromNewTypes` is not available in this repo.

[`io-ts` for Deno is also available](https://github.com/michaelhirn/io-ts).

# Installation / Usage

> Note: This package is only available for version `io-ts-types@0.5.16` for now

```ts
import * as IOT from 'https://raw.githubusercontent.com/michaelhirn/io-ts-types/master/lib/index.ts'
```

## ToDo

- [ ] setup [deno.land/x](https://deno.land/x) CI/CD
