import { sign, verify } from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || '';

export async function generateToken(id: number) {
    const jwt = sign({id}, JWT_SECRET, {
        expiresIn: "1h",
    });
    return jwt;
}

export async function verifyToken(jwt: string) {
    try {
        const isValid = verify(jwt, JWT_SECRET);
        return isValid;
    } catch (error) {
        console.error("JWT Verification Error:", error);
        return false;
    }
}