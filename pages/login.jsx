import Head from 'next/head'
import {useEffect,useState} from 'react'
//import useSWR from 'swr';
//import axios from 'axios';
import Toolbar from '../global_to_local_dict_lib/toolbar'
import Autocomplete from '../global_to_local_dict_lib/autocomplete'
import {url} from '../global_to_local_dict_lib/rootUrl'
import Image from '../global_to_local_dict_lib/audio-player'


export default function AddWord(argument) {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [data, setData] = useState(null)
  const [input, setInput] = useState("");
  const [search, setSearch] = useState('')
  const [isLoading, setLoading] = useState(false)
  const urlSearch=`${url}/api-auth/login/?next=${search}`
  //const fetcher = (...args) => fetch(...args).then(res => res.json())
  //const { data, error } = useSWR(urlSearch, fetcher)

  
  useEffect(() => {
    setLoading(true)
    fetch(`${urlSearch}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.results.map(l=>l.name))
        setLoading(false)
      })
  }, [])
  
  
  
  return(
  <div className="container">
  <Head>
        <title>Login page</title>
        <meta charset="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="description" content="local to global login page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toolbar/>
  <section class="h-100">
    <div class="container h-100">
      <div class="row justify-content-md-center h-100">
        <div class="card-wrapper">
          <div class="brand">
            <Image/>
          </div>
          <div class="card fat">
            <div class="card-body">
              <h4 class="card-title">Register</h4>
              <form method="POST" class="my-login-validation" novalidate="">
                <div class="form-group">
                  <label for="name">Name</label>
                  <Autocomplete setInput={setInput} input={input} suggestions={data}/>
                  <div class="invalid-feedback">
                    What's your name?
                  </div>
                </div>
                <div class="form-group">
                  <label for="name">Name</label>
                  <input id="name" type="text" class="form-control" name="name" required autofocus/>
                  <div class="invalid-feedback">
                    What's your name?
                  </div>
                </div>
                <div class="form-group">
                  <label for="email">E-Mail Address</label>
                  <input id="email" type="email" class="form-control" name="email" required/>
                  <div class="invalid-feedback">
                    Your email is invalid
                  </div>
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input id="password" type="password" class="form-control" name="password" required data-eye/>
                  <div class="invalid-feedback">
                    Password is required
                  </div>
                </div>
                <div class="form-group">
                  <div class="custom-checkbox custom-control">
                    <input type="checkbox" name="agree" id="agree" class="custom-control-input" required=""/>
                    <label for="agree" class="custom-control-label">I agree to the <a href="#">Terms and Conditions</a></label>
                    <div class="invalid-feedback">
                      You must agree with our Terms and Conditions
                    </div>
                  </div>
                </div>
                <div class="form-group m-0">
                  <button type="submit" class="btn btn-primary btn-block">
                    Register
                  </button>
                </div>
                <div class="mt-4 text-center">
                  Already have an account? <a href="index.html">Login</a>
                </div>
              </form>
            </div>
          </div>
          <div class="footer">
            Copyright &copy; 2017 &mdash; Your Company
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
    )
}