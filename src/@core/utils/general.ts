import { Dispatch, SetStateAction } from "react";
import { AES, enc } from 'crypto-js';

/******************************************************************************/
type UpdateValueFunction<T> = <K extends keyof T>(
	key: K,
	value: T[K],
) => Promise<void>;

export const createUpdateValue = <T>(
	setValue: Dispatch<SetStateAction<T>>,
): UpdateValueFunction<T> => {
	return async <K extends keyof T>(key: K, value: T[K]) => {
		await new Promise<void>((resolve) => {
			setValue((old) => ({ ...old, [key]: value }));
			resolve();
		});
	};
};
// /******************************************************************************/
// const algorithm = 'aes-256-cbc';
const secretKey = 'Escol@01';

export const encryptText = (value: string) => {
	return AES.encrypt(value, secretKey);
}

export const dencryptText = (encryptedValue: string) => {
	const bytes = AES.decrypt(encryptedValue, secretKey);
	return bytes.toString(enc.Utf8);
}



// const iv = crypto.randomBytes(16);

// export const encrypt = (text: string) => {
// 	const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
// 	let encrypted = cipher.update(text, 'utf8', 'hex');
// 	encrypted += cipher.final('hex');
// 	return encrypted;
// };

// export const decrypt = (hash: string) => {
// 	const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
// 	let decrypted = decipher.update(hash, 'hex', 'utf8');
// 	decrypted += decipher.final('utf8');
// 	return decrypted;
// };
