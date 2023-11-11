import { hash, compare } from "bcrypt";

async function encrypt(password: string) {
    const passwordHash = await hash(password, 8);
    return passwordHash;
}
 
async function verify (password: string, passwordHash: string) {
    const isValid = await compare(password, passwordHash);
    return isValid;
}

export { encrypt, verify };