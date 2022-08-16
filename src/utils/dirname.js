import { dirname as dir } from 'path'
import { fileURLToPath } from 'url'

export function dirname(meta) {
    return dir(fileURLToPath(meta.url))
}