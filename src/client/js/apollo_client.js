import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

export const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://api.graphcms.com/simple/v1/cjcdvzcre0ten0153t5t60tsg' }),
  cache: new InMemoryCache()
})
