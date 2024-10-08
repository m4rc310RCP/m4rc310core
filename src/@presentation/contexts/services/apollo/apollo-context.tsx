import { createContext, FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { createUpdateValue } from '@core/utils/general';

export interface IServerApolloValues {
	changeToken: (token: string) => void;
	token: string;
}

const defaultValue: IServerApolloValues = {
	token: "",
	changeToken: (token: string) => { console.log(token) }
};

const ServerApolloContext = createContext<IServerApolloValues>(defaultValue);

const ServerApolloProvider: FC<PropsWithChildren> = ({ children }) => {
	const [value, setValue] = useState<IServerApolloValues>(defaultValue);
	const update = createUpdateValue(setValue);

	const changeToken = useCallback((token: string) => {
		update('token', token);
	}, [update]);

	useEffect(() => {
		update('changeToken', changeToken);
	}, []);


	return <ServerApolloContext.Provider value={value}>{children}</ServerApolloContext.Provider>;
};

export { ServerApolloContext, ServerApolloProvider };