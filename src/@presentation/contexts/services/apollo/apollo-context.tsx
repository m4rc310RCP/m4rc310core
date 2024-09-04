import { createContext, FC, PropsWithChildren, useState } from "react";
import { createUpdateValue } from '@core/utils/general';

export interface IServerApolloValues {
	changeToken?: (token: string) => void;
	token: string;
}

const defaultValue: IServerApolloValues = {
	token: ""
};

const ServerApolloContext = createContext<IServerApolloValues>(defaultValue);

const ServerApolloProvider: FC<PropsWithChildren> = ({ children }) => {
	const [value, setValue] = useState<IServerApolloValues>(defaultValue);
	const update = createUpdateValue(setValue);

	const changeToken = (token: string) => {
		update('token', token);
	}
	update('changeToken', changeToken);
	return <ServerApolloContext.Provider value={value}>{children}</ServerApolloContext.Provider>;
};

export { ServerApolloContext, ServerApolloProvider };