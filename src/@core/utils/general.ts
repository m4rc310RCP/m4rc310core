import { Dispatch, SetStateAction } from "react";
import { AES, enc } from 'crypto-js';
import { SECRET_KEY } from '@core/params/env';

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
/******************************************************************************/
export const encryptText = (value: string) => {
	return AES.encrypt(value, SECRET_KEY);
}

export const dencryptText = (encryptedValue: string) => {
	const bytes = AES.decrypt(encryptedValue, SECRET_KEY);
	return bytes.toString(enc.Utf8);
}
/******************************************************************************/