import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import styles from '../styles/Home.module.css'
import {url} from '../global_to_local_dict_lib/rootUrl'
import Pagination from '../global_to_local_dict_lib/pagination'
import Toolbar from '../global_to_local_dict_lib/toolbar'
import AudioPlayer from '../global_to_local_dict_lib/audio-player'
import { useSession } from "next-auth/react"



// This gets called on every request
export async function getServerSideProps({query}) {
  const page = query.page || 1
  const search = query.search || ''
  const res = await fetch(`${url}/translate/?page=${page}&search=${search}`)
  const data = await res.json()
  const results = await data.results.map((word)=>{
    const word_translate = {
        url: word.url,
        word: word.word,
        word_audio: word.word_audio,
        translate: word.translate,
        translate_audio: word.translate_audio,
        machine: word.machine,
        created_at: word.created_at,
        updated_at: word.updated_at,
        added_by: (word.added_by ? word.added_by.username : "AI"),
        from_language: word.from_language.name,
        to_language: word.to_language.name
    }
    return word_translate;
  })
  data.results = results
  // console.log(data)
  // Pass data to the page via props
  return { props: { data } }
}



export default function Home({data}) {
  const router = useRouter()
  const { data: session, status } = useSession() 
  const list = data.results.map((obj)=>{
    return  (
      <div class="card-body">
        <div class="img-thumbnail1">
          <h4 class="card-title">{obj.from_language} &rarr; {obj.to_language}</h4>
          <p class="card-text">{obj.word} &rarr; {obj.translate}</p>
          <a href="#" class="card-link">related</a> | 
          <Link href={{ pathname: '/user', query: { search: obj.added_by } }}>
          <a class="card-link">Added by: <small>{obj.added_by}</small> </a>
          </Link>
          <AudioPlayer obj={obj}/>
        </div>
        <hr/>
      </div>
    )
  })
  return (
    <React.Fragment>
      <Head>
        <title>Local languages to international and global translations</title>
        <meta charset="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="description" content="This page promote the Local communities languages by letting its words be matched with international words" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Toolbar/>

      <main className="container">
        <h1 className={styles.title}>
          Welcome to
        </h1>
        <p className={styles.description}>
          Local-Global Translator <strong>{data.count} {data.count == 1 ? 'record' : 'records'}</strong>
        </p>
        <div className="container">
         {list}
        </div>
        <Pagination page_obj={data} />
      </main>
    
    </React.Fragment>
  )
}
