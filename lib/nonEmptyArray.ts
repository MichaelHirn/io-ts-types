/**
 * @since 0.5.0
 */
import * as t from 'https://raw.githubusercontent.com/michaelhirn/io-ts/master/lib/index.ts'
import { NonEmptyArray, fromArray } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/NonEmptyArray.ts'
import { isNonEmpty } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Array.ts'
import { pipe } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/pipeable.ts'
import { chain } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Either.ts'
import { isNone } from 'https://raw.githubusercontent.com/michaelhirn/fp-ts/master/lib/Option.ts'

/**
 * @since 0.5.0
 */
export interface NonEmptyArrayC<C extends t.Mixed>
  extends t.Type<NonEmptyArray<t.TypeOf<C>>, Array<t.OutputOf<C>>, unknown> {}

/**
 * @since 0.5.0
 */
export function nonEmptyArray<C extends t.Mixed>(
  codec: C,
  name: string = `NonEmptyArray<${codec.name}>`
): NonEmptyArrayC<C> {
  const arr = t.array(codec)
  return new t.Type(
    name,
    (u): u is NonEmptyArray<t.TypeOf<C>> => arr.is(u) && isNonEmpty(u),
    (u, c) =>
      pipe(
        arr.validate(u, c),
        chain(as => {
          const onea = fromArray(as)
          return isNone(onea) ? t.failure(u, c) : t.success(onea.value)
        })
      ),
    nea => arr.encode(nea)
  )
}
