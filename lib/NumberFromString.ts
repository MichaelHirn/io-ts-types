/**
 * @since 0.5.0
 */
import * as t from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib/index.ts'
import { pipe } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/pipeable.ts'
import { chain } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Either.ts'

/**
 * @since 0.5.0
 */
export interface NumberFromStringC extends t.Type<number, string, unknown> {}

/**
 * @example
 * import { NumberFromString } from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib-types/lib/NumberFromString'
 *
 * NumberFromString.decode('1') // right(1)
 * NumberFromString.decode('1.1') // right(1.1)
 *
 * @since 0.5.0
 */
export const NumberFromString: NumberFromStringC = new t.Type<number, string, unknown>(
  'NumberFromString',
  t.number.is,
  (u, c) =>
    pipe(
      t.string.validate(u, c),
      chain(s => {
        const n = +s
        return isNaN(n) || s.trim() === '' ? t.failure(u, c) : t.success(n)
      })
    ),
  String
)
