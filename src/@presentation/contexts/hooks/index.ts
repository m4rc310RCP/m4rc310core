import { useContext } from 'react';
import { ServerApolloContext } from '@presentation/contexts/services/apollo/apollo-context';

const useServerApollo = () => useContext(ServerApolloContext);

export { useServerApollo };