/**
 * @since 0.5.0
 */
import { pipe } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/pipeable.ts'
import { map } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Either.ts'
import * as O from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Option.ts'
import * as t from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib/index.ts'
import { option } from './option.ts'

/**
 * @since 0.5.0
 */
export interface OptionFromNullableC<C extends t.Mixed>
  extends t.Type<O.Option<t.TypeOf<C>>, t.OutputOf<C> | null, unknown> {}

/**
 * @since 0.5.0
 */
export function optionFromNullable<C extends t.Mixed>(
  codec: C,
  name: string = `Option<${codec.name}>`
): OptionFromNullableC<C> {
  return new t.Type(
    name,
    option(codec).is,
    (u, c) =>
      u == null
        ? t.success(O.none)
        : pipe(
            codec.validate(u, c),
            map(O.some)
          ),
    a =>
      O.toNullable(
        pipe(
          a,
          O.map(codec.encode)
        )
      )
  )
}
