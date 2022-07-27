/**
 * @since 0.4.3
 */
import * as t from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib/index.ts'
import { withValidate } from './withValidate.ts'
import { mapLeft } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Either.ts'

/**
 * Returns a clone of the given codec that sets the given string as error messsage
 *
 * @example
 * import { withMessage } from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib-types/lib/withMessage'
 * import * as t from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib'
 * import { PathReporter } from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib/lib/PathReporter'
 * import { right } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Either'
 *
 * const T = withMessage(t.number, () => 'Invalid number')
 *
 * assert.deepStrictEqual(T.decode(1), right(1))
 * assert.deepStrictEqual(PathReporter.report(T.decode(null)), ['Invalid number'])
 *
 * @since 0.4.3
 */
export function withMessage<C extends t.Any>(codec: C, message: (i: t.InputOf<C>, c: t.Context) => string): C {
  return withValidate(codec, (i, c) =>
    mapLeft(() => [
      {
        value: i,
        context: c,
        message: message(i, c),
        actual: i
      }
    ])(codec.validate(i, c))
  )
}
