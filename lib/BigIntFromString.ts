/**
 * @since 0.5.11
 */
import * as t from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib/index.ts'
import { pipe } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/pipeable.ts'
import { chain } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Either.ts'
import { NonEmptyString } from './NonEmptyString.ts'

/**
 * @since 0.5.11
 */
export interface BigIntFromStringC extends t.Type<bigint, string, unknown> {}

/**
 * @example
 * import { BigIntFromString } from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib-types/lib/BigIntFromString'
 * import { right } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Either'
 * import { PathReporter } from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib/lib/PathReporter'
 *
 * assert.deepStrictEqual(BigIntFromString.decode('1'), right(BigInt(1)))
 * assert.deepStrictEqual(PathReporter.report(BigIntFromString.decode('1.1')), ['Invalid value "1.1" supplied to : BigIntFromString'])
 * assert.deepStrictEqual(PathReporter.report(BigIntFromString.decode('')), ['Invalid value "" supplied to : BigIntFromString'])
 * assert.deepStrictEqual(PathReporter.report(BigIntFromString.decode(' ')), ['Invalid value " " supplied to : BigIntFromString'])
 *
 * @since 0.5.11
 */
export const BigIntFromString: BigIntFromStringC = new t.Type<bigint, string, unknown>(
  'BigIntFromString',
  // tslint:disable-next-line
  (u): u is bigint => typeof u === 'bigint',
  (u, c) =>
    pipe(
      t.string.validate(u, c),
      chain(s => {
        if (!NonEmptyString.is(s.trim())) {
          return t.failure(u, c)
        }
        try {
          return t.success(BigInt(s))
        } catch (error) {
          return t.failure(u, c)
        }
      })
    ),
  String
)
