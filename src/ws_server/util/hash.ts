import { createHash } from "node:crypto"

export const hashPassword: (data:string) => string = (data: string) => {
    return createHash('sha256').update(data).digest('hex')
}