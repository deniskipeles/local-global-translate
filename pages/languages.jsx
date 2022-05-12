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
  const res = await fetch(`${url}/language/?page=${page}&search=${search}`)
  const data = await res.json()
  const results = await data.results.map((word)=>{
    const language_obj = {
        url: word.url,
        country: word.country_name,
        name: word.name,
        local: word.local,
    }
    return language_obj;
  })
  data.results = results
  // console.log(data)
  // Pass data to the page via props
  return { props: { data } }
}



export default function Home({data}) {
  const router = useRouter()
  const list = data.results.map((obj)=>{
    return  (
      <div class="card">
        <div class="card-body">
          <h4 class="card-title"> {obj.name} language</h4>
          <p class="card-text"><strong>Country: </strong> {obj.country} </p>
          <p class="card-text">{obj.local ? 'Local' : 'National'} language</p>
        </div>
        <hr/>
      </div>
    )
  })
  return (
    <div>
      <Head>
        <title>Local, international and global languages known</title>
        <meta charset="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="description" content="languages available in our databases" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toolbar/>

      <main className="container">
        <div className="container">
          <div className={styles.footer}>
            <a className="btn btn-primary" onClick={()=>router.push('/translate/add-language')}>
              ADD LANGUAGE
            </a>
          </div>
        </div>
        <p className={styles.description}>
          Local and Global languages <strong>{data.count} {data.count == 1 ? 'record' : 'records'}</strong>
        </p>
         <div className="container">
         {list}
         </div>
        <Pagination page_obj={data} />
      </main>
      
    </div>
  )
}
