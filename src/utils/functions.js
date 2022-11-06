import { hash, genSalt, compare } from 'bcrypt'

export const createHash = async string => await hash(string, await genSalt(10))

export const compareHash = async (string, hash) => await compare(string, hash)

export const stringify = value => JSON.stringify(value)

export const validateObjId = (value1, value2, equal = true) => {
    if (equal) return stringify(value1) === stringify(value2)
    else return stringify(value1) !== stringify(value2)
}
