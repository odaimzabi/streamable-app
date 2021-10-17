import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import styles from './styles/layout.module.css'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'
import { Button, Spinner } from '@chakra-ui/core'
import { useRouter } from 'next/router'
type Props = {
  children?: ReactNode
  title?: string
}

function Layout({ children, title = 'This is the default title' }: Props) {


  const [{data,fetching}]=useMeQuery({pause:typeof window=='undefined'})
  const [{fetching:loading},logout]=useLogoutMutation()
  let body=null
   
  if (fetching){
    body=(
      <Spinner color="white"/>
    )
  }

  if (data?.Me){
    body=(
      <ul>
      <li>

        <span>
          {data.Me.username}
        </span>

        <Button variantColor="red" variant="link"
        
          isLoading={loading}
          onClick={ async ()=>{
            await logout()
          }}
        >
          Logout
          </Button>
      </li>
    </ul>
    )
  }else {
    body=(
      <ul>
      <li>
        <Link href="/login">
          Login
        </Link>

        <Link href="/register">
          Register
        </Link>
      </li>
    </ul>
    )
  }

return (
  <div className={styles.container}>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <nav>
      <span>Streamble</span>
        {body}
    </nav>
    {children}
  
  </div>
)

}
export default Layout
