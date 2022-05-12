import Image from 'next/image'
import {useState} from 'react'
import Head from 'next/head'

import { useRouter } from 'next/router'

import styles from '../styles/Home.module.css'
import {url} from '../global_to_local_dict_lib/rootUrl'
import Pagination from '../global_to_local_dict_lib/pagination'
import Toolbar from '../global_to_local_dict_lib/toolbar'
import AudioPlayer from '../global_to_local_dict_lib/audio-player'
import { useSession } from "next-auth/react"
import { getSession } from 'next-auth/react'



// This gets called on every request
export async function getServerSideProps({query, req}) {
  //console.log(user);
  const page = query.page || 1
  const search = query.search || ''
  
  
  const res_user=await fetch(`${url}/account/?search=${search}`).then(data=>data.json());
  const user=res_user.results[0];
  //localhost:8000/translate/create/by-current-user/word/?search=denis
  const res = await fetch(`${url}/translate/create/by-current-user/word/?page=${page}&search=${search}`)
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
  return { props: { data,user } }
}



export default function Home({data,user}) {
  const router = useRouter()
  const { data: session, status } = useSession() 
  const list = data.results.map((obj)=>{
  return  (
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">{obj.from_language} &rarr; {obj.to_language}</h4>
        <p class="card-text">{obj.word} &rarr; {obj.translate}</p>
        <a href="#" class="card-link">related</a> | 
        <a href="#" class="card-link">Added by: <small>{obj.added_by}</small> </a>
        <AudioPlayer obj={obj}/>
      </div>
      <hr/>
    </div>
  )
  })
  
  return (
    <div className="container1">
      <Head>
        <title>{user ? user.username+' '+user.first_name+' '+user.last_name+' from '+user.country_name : 'User Account'}</title>
        <meta charset="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="description" content={user ? user.first_name+' '+user.last_name : 'User Full Name'} />
        <link rel="icon" href={user ? user.local_image : "/favicon.ico"} />
      </Head>
      
      <Toolbar/>
      <main className="container">
        <div className="container">
         <h1 className={styles.title}>
          Account User : {user ? user.username : 'None'}
         </h1>
         <p className={styles.description}><strong>Email : </strong>{user ? user.email : 'None'}</p>
         <p className={styles.description}><strong>Name : </strong>{user ? user.first_name+' '+user.last_name : 'None'}</p>
         <p className={styles.description}><strong>From : </strong>{user ? user.country_name : 'None'}</p>
         <MyImage src={user ? user.cloud_image || user.local_image : null}/>
         <div className="img-thumbnail">
            {list}
         </div>
        </div>
        <Pagination page_obj={data} />
      </main>
    </div>
  )
}



const MyImage = (props) => {
  const [data, setData] = useState(0)
  
  const myLoader = ({ src, width, quality }) => {
    return `${props.src}?w=${width}&q=${20}`
  }
  if (props.src) {
    return (
      <Image
        loader={myLoader}
        src="me.png"
        alt="Picture of the author"
        width={500}
        height={500}
        layout="responsive"
        objectFit="contain"
      />
    )
  }
  return (
    <Image
      //loader={myLoader}
      src="/static/imgs/account.png"
      alt="Picture of the author"
      width={500}
      height={500}
      layout="responsive"
      objectFit="contain"
    />
  )
}
