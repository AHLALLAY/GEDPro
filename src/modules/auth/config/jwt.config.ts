if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is required in .env file');
}
if (!process.env.JWT_EXPIRATION) {
    throw new Error('JWT_EXPIRATION is required in .env file');
}

export const jwtConfig = {
    secret: process.env.JWT_SECRET as string,
    signOptions: {
        expiresIn: process.env.JWT_EXPIRATION as string
    }
}