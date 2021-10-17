import { useRouter } from "next/router"
import { useEffect } from "react"
import { useMeQuery } from "../generated/graphql"



const useAuth=()=>{

    const [{fetching:fetching,data}]=useMeQuery()
    const router=useRouter()
    useEffect(()=>{
        if (!fetching && !data?.Me){

        //     if (router.pathname=="/room/[id]"){
        //     router.push(`/login/?next=${router.asPath}`)
        // }else{
            router.push(`/login/?next=${router.asPath}`)
            // }
        }
    },[data])
}

export default useAuth