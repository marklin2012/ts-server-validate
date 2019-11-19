import schema from 'async-validator';
import { resolve } from 'dns';

function handleValidate(rules, source: object) {
  return new Promise((resolve, reject) => {
    const validator = new schema(rules)
    validator.validate({ ...source }).then(() => {
      resolve({ ok: 1 })

    }).catch(({ errors, fields }) => {
      reject(JSON.stringify(errors))
    })
  })
}

export function validate(rules) {
  return (target, name, descriptor) => {
    const oldValue = descriptor.value
    descriptor.value = async function () {
      try {
        const ctx = arguments[0]
        const res = await handleValidate(rules, ctx.query)
        return oldValue.apply(null, arguments)
      } catch (err) {
        throw err
      }
    }
    return descriptor

  }
}