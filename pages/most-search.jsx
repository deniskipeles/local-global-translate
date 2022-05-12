import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import styles from '../styles/Home.module.css'
import {url} from '../global_to_local_dict_lib/rootUrl'
import Pagination from '../global_to_local_dict_lib/pagination'
import Toolbar from '../global_to_local_dict_lib/toolbar'
import AudioPlayer from '../global_to_local_dict_lib/audio-player'



// This gets called on every request
export async function getServerSideProps({query}) {
  const page = query.page || 1
  const search = query.search || ''
  const res = await fetch(`${url}/translate/most/search/word/?page=${page}&search=${search}`)
  const data = await res.json()
  
  const searches = (data) => data.map((word)=>{
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
  
  const results = await data.results.map((word)=>{
    const word_translate = {
        url: word.url,
        word: word.word,
        searches: word.searches,
        word_search_field: searches(word.word_search_field)
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
  const wordList = data.results.map((obj)=>{
    
    const searchList = obj.word_search_field.map((obj)=>{
      return  (
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">{obj.from_language} &rarr; {obj.to_language}</h4>
            <p class="card-text">{obj.word} &rarr; {obj.translate}</p>
            <a href="#" class="card-link">Added by: <small>{obj.added_by}</small> </a>
            <AudioPlayer obj={obj}/>
          </div>
          <hr/>
        </div>
      )
    })
    
    return  (
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">{obj.word}</h3>
          <p class="card-text">{obj.searches} {obj.searches != 1 ? 'searches' :'search'}</p>
          <div className="small img-thumbnail container">
            {searchList}
          </div>
        </div>
        <hr/>
      </div>
    )
  })
  
  return (
    <div className="">
      <Head>
        <title>Local languages to international and global translations most searched word</title>
        <meta charset="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="description" content="words that are frequently searched across the globe" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toolbar/>

      <main className="container">
        <h1 className={styles.title}>
          Most searched
        </h1>

        <p className={styles.description}>
        words and statements or sentences {'\n'}
        </p>
        <p className={styles.description}>
        <strong>{data.count} {data.count == 1 ? 'record' : 'records'}</strong> available
        </p>
        <div className="container">
         {wordList}
        </div>
        <Pagination page_obj={data} />
      </main>
    </div>
  )
}
