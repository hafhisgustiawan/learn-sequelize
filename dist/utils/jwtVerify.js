import jwt from 'jsonwebtoken';
export async function jwtVerify(token, secret) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err)
                return reject(err);
            resolve(decoded);
        });
    });
}
