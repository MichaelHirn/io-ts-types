/**
 * @since 0.5.0
 */
import * as t from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib/index.ts'
import { Either } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Either.ts'

const leftLiteral = t.literal('Left')

const rightLiteral = t.literal('Right')

/**
 * @since 0.5.0
 */
export interface EitherC<L extends t.Mixed, R extends t.Mixed>
  extends t.Type<Either<t.TypeOf<L>, t.TypeOf<R>>, Either<t.OutputOf<L>, t.OutputOf<R>>, unknown> {}

/**
 * Given a codec representing a type `L` and a codec representing a type `A`, returns a codec representing `Either<L, A>` that is able to deserialize
 * the JSON representation of an `Either`.
 *
 * @example
 * import { either } from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib-types/lib/either'
 * import { left, right } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Either'
 * import * as t from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib'
 * import { PathReporter } from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib/lib/PathReporter'
 *
 * const T = either(t.string, t.number)
 *
 * assert.deepStrictEqual(T.decode(right(1)), right(right(1)))
 * assert.deepStrictEqual(T.decode(left('a')), right(left('a')))
 * assert.deepStrictEqual(PathReporter.report(T.decode(right('a'))), ['Invalid value "a" supplied to : Either<string, number>/1: Right<string>/right: number'])
 *
 * @since 0.5.0
 */
export function either<L extends t.Mixed, R extends t.Mixed>(
  leftCodec: L,
  rightCodec: R,
  name: string = `Either<${leftCodec.name}, ${rightCodec.name}>`
): EitherC<L, R> {
  return t.union(
    [
      t.strict(
        {
          _tag: leftLiteral,
          left: leftCodec
        },
        `Left<${leftCodec.name}>`
      ),
      t.strict(
        {
          _tag: rightLiteral,
          right: rightCodec
        },
        `Right<${leftCodec.name}>`
      )
    ],
    name
  )
}
