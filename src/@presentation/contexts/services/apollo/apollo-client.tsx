import {
	ApolloClient,
	createHttpLink,
	InMemoryCache,
	split
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context"
import { API_URL_DOMAIN } from "@core/params/env";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from "@apollo/client/utilities";
//------------------------------------------------------//
const uri: string = API_URL_DOMAIN
//------------------------------------------------------//
const httpLink = createHttpLink({
	uri,
});
//------------------------------------------------------//
const wsLink = new GraphQLWsLink(
	createClient({
		url: uri.replace('http', 'ws'),
		connectionParams: {
			"Access-Control-Allow-Origin": "*", // Required for CORS support to work
			credentials: true
		},
		on: {
			connected: () => console.log('GraphQLWsLink connected'),
			closed: () => console.log('GraphQLWsLink closed'),
		}
	}),
);



//------------------------------------------------------//
const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
	},
	wsLink,
	httpLink,
);
//------------------------------------------------------//
const authLink = setContext((_, { headers }) => {
	return {
		headers: {
			...headers,
			authorization: 'Test test:test',
		},
	}
})
//------------------------------------------------------//
export const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: authLink.concat(splitLink),
});
//------------------------------------------------------//