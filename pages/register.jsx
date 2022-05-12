import Head from 'next/head'
import Image from 'next/image'
import { signIn } from 'next-auth/react';
import {useEffect,useState} from 'react'
//import useSWR from 'swr';
//import axios from 'axios';
import Toolbar from '../global_to_local_dict_lib/toolbar'
import Autocomplete from '../global_to_local_dict_lib/autocomplete'
import {url} from '../global_to_local_dict_lib/rootUrl'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'



export default function AddWord(argument) {
  const { data: session, status } = useSession() 
  const router = useRouter()
  
  const [data, setData] = useState([])
  const [input, setInput] = useState("");
  const [usernameExist, setUsernameExist] = useState('username required');
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [warning, setWarning] = useState(false);
  
  const [isLoading, setLoading] = useState(false)
  const urlSearchCountry=`${url}/language/country/?search=${input}`
  const urlSearchUsername=`${url}/account/search/user/exist/?search=${username}`
  //http://localhost:8000/account/search/user/exist/?search=den
  //const fetcher = (...args) => fetch(...args).then(res => res.json())
  //const { data, error } = useSWR(urlSearch, fetcher)

  
  useEffect(() => {
    setLoading(true)
    fetch(`${urlSearchCountry}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.results)
        setLoading(false)
      })
  }, [input])
  
  useEffect(() => {
    setLoading(true)
    fetch(`${urlSearchUsername}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.results.length>0) {
          setUsernameExist('username already exist')
          setWarning(true)
        }
        if (data.results.length==0) {
          setUsernameExist('Go ahead')
          setWarning(false)
        }
        setLoading(false)
      })
  }, [username])
  
  const submitData=(e)=>{
    e.preventDefault()
    const countryUrl=data.filter(u=>u.name==input)
    const dt = {
      email,
      username,
      password,
      country:(countryUrl.length > 0 ? countryUrl[0].url : null),
      write_only_country_name:input,
      first_name:firstName,
      last_name:lastName,
      local_image:null,
      cloud_image:null,
      description:null
    }
    //alert(JSON.stringify(dt))
    const postData =  () => {
      //const rawResponse = await 
      fetch(`${url}/account/`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dt)
      })
      .then(data=>data.json())
      .then(data=>{
        if (data) {
          //alert(JSON.stringify(data))
          signIn('credentials', {redirect: false, password,username })
          router.push('/')
        }
      })
    }
    postData()
  }
  
  const handleChangeUsername = (e) => setUsername(e.target.value)
  const handleChangeEmail = (e) => setEmail(e.target.value)
  const handleChangePassword = (e) => setPassword(e.target.value)
  const handleChangeFirstName = (e) => setFirstName(e.target.value)
  const handleChangeLastName = (e) => setLastName(e.target.value)
  
  return(
  <div className="container">
  <Head>
        <title>signup page</title>
        <meta charset="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="description" content="local to global signup page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toolbar/>
  <section class="h-100">
    <div class="container h-100">
      <div class="row justify-content-md-center h-100">
        <div class="card-wrapper">
          <center>
          <div class="brand">
              <Image 
                src="/static/imgs/auth.png" alt="REGISTER USER"
                width={120}
                height={115}
                //layout="responsive"
                //objectFit="contain"
              />
          </div>
          </center>
          <div class="card fat">
            <div class="card-body img-thumbnail">
              <center>
              <h4 class="card-title">REGISTER ACCOUNT</h4>
              </center>
              <form onSubmit={submitData} method="POST" class="my-login-validation" novalidate="">
                <div class="img-thumbnail form-group container">
                
                  <label for="name">Your Username</label>
                  <input onChange={handleChangeUsername} value={username} id="username" type="text" class="form-control" name="username" required autofocus/>
                  <div class={`invalid-feedback ${warning ? 'text-danger' : 'text-success'}`}>
                    {usernameExist}
                  </div>
                  
                
                  <label for="name">Your Email</label>
                  <input onChange={handleChangeEmail} value={email} id="email" type="email" class="form-control" name="email" required autofocus/>
                  <div class="invalid-feedback">
                    email required
                  </div>
                  
                
                  <label for="firstName">First Name</label>
                  <input onChange={handleChangeFirstName} value={firstName} id="firstName" type="firstName" class="form-control" name="firstName" required autofocus/>
                  <div class="invalid-feedback">
                    first name required
                  </div>
                  
                
                  <label for="lastName">Last Name</label>
                  <input onChange={handleChangeLastName} value={lastName} id="lastName" type="lastName" class="form-control" name="lastName" required autofocus/>
                  <div class="invalid-feedback">
                    last name required
                  </div>
                  
                
                  <label for="password">Enter Password</label>
                  <input onChange={handleChangePassword} value={password} id="password" type="password" class="form-control" name="password" required autofocus/>
                  <div class="invalid-feedback">
                    password required
                  </div>
                  
                  
                  <label for="country">Country</label>
                  <Autocomplete setInput={setInput} input={input} suggestions={data.map(l=>l.name)}/>
                  <div class="invalid-feedback">
                    What's your home country?
                  </div>
                </div>
                
                
                <div class="form-group m-0">
                  <button type="submit" class="btn btn-primary btn-block">
                    REGISTER
                  </button>
                </div>
                
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </section>
  </div>
    )
}