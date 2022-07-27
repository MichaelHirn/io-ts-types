/**
 * @since 0.5.0
 */
import * as t from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib/index.ts'
import { Option } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Option.ts'

const None = t.strict({
  _tag: t.literal('None')
})

const someLiteral = t.literal('Some')

/**
 * Given a codec representing a type `A`, returns a codec representing `Option<A>` that is able to deserialize
 * the JSON representation of an `Option`.
 *
 * @example
 * import { option } from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib-types/lib/option'
 * import { right } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Either'
 * import { none, some } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Option'
 * import * as t from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib'
 * import { PathReporter } from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib/lib/PathReporter'
 *
 * const T = option(t.number)
 *
 * assert.deepStrictEqual(T.decode(none), right(none))
 * assert.deepStrictEqual(T.decode(some(1)), right(some(1)))
 * assert.deepStrictEqual(PathReporter.report(T.decode(some('a'))), ['Invalid value "a" supplied to : Option<number>/1: Some<number>/value: number'])
 *
 * @since 0.5.0
 */
export interface OptionC<C extends t.Mixed> extends t.Type<Option<t.TypeOf<C>>, Option<t.OutputOf<C>>, unknown> {}

/**
 * @since 0.5.0
 */
export function option<C extends t.Mixed>(codec: C, name: string = `Option<${codec.name}>`): OptionC<C> {
  return t.union(
    [
      None,
      t.strict(
        {
          _tag: someLiteral,
          value: codec
        },
        `Some<${codec.name}>`
      )
    ],
    name
  )
}
