import { dedupExchange, fetchExchange } from "urql";
import { cacheExchange } from '@urql/exchange-graphcache';
import betterUpdateQuery from "./betterUpdateQuery";
import { LoginMutation, LogoutMutation, MeDocument, MeQuery } from "../generated/graphql";


export const createUrqlClient=(ssrExchange:any,_ctx:any)=>({
    url:"http://localhost:4000/graphql",
    fetchOptions:{
        credentials:"include" as const,
    },
    exchanges:[dedupExchange, cacheExchange({
            updates:{
                Mutation:{
                    Login:(_result, _args, cache, _info)=>{
                        betterUpdateQuery<LoginMutation,MeQuery>(cache,{query:MeDocument},_result,(result,query)=>{
                    if (!result?.Login){
                      return query;
                    }else {
                      return {
                        Me:result?.Login
                      }
                    }
                    
            }
          )
            
         
                    
  },
  Logout:(_result, _args, cache, _info)=>{


    betterUpdateQuery<LogoutMutation,MeQuery>(cache,{query:MeDocument},_result,(result,query)=>{
      if (!result?.Logout){
        return query;
      }else {
        return {
          Me:null
        }
      }
      
}
)


  }
    
}
            }          
            
    }),fetchExchange,ssrExchange],
})