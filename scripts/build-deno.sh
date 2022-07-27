#! /bin/sh
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path"

fastmod --accept-all -e ts -d ../dist/deno "fp-ts DENOIFY: DEPENDENCY UNMET \(DEV DEPENDENCY\)" "https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/index.ts"
fastmod --accept-all -e ts -d ../dist/deno "io-ts DENOIFY: DEPENDENCY UNMET \(DEV DEPENDENCY\)" "https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib/index.ts"
fastmod --accept-all -e ts -d ../dist/deno " DENOIFY: DEPENDENCY UNMET \(DEV DEPENDENCY\)" ".ts"
fastmod --accept-all -e ts -d ../dist/deno "from 'fp-ts/es6/" "from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/"
fastmod --accept-all -e ts -d ../dist/deno "from 'fp-ts/lib/" "from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/"
fastmod --accept-all -e ts -d ../dist/deno "from 'fp-ts/" "from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/"
fastmod --accept-all -e ts -d ../dist/deno "from 'io-ts" "from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib"
rm -rdf ../lib
mkdir ../lib
cp -r ../dist/deno/* ../lib/
