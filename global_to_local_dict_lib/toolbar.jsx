import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import {url} from './rootUrl'
import { signOut,useSession } from "next-auth/react"


export default function Toolbar(argument) {
  const router = useRouter();
 const { data: session, status } = useSession() 
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [path, setRoute] = useState('/');
  
  const route=router.asPath
  useEffect(()=>{
    const path=router.asPath
    if(path.search("/languages") >= 0){
      setRoute('/languages')
    }else if(path.search("/word") >= 0){
      setRoute("/")
    }
    
  },[])
  const handleSubmit =(e)=>{
    e.preventDefault()
    if(path=='/'){
      const data = {
        word:searchText
      }
      fetch(`${url}/translate/most/search/word/`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
    }
    router.push(
    {
      pathname: path,
      query: {
        search:searchText,
      }
    },
    /*undefined,
    {
      shallow: true,
    },*/
   );
   //router.replace(router.asPath);
  }
  
  function handleChange(e) {
    setSearchText(e.target.value);
  }

  const handleNavCollapse = (e) =>{
    e.preventDefault()
    setIsNavCollapsed(!isNavCollapsed);
  }
  
  
  const [scrolled,setScrolled]=React.useState(false);
  const handleScroll=() => {
    const offset=window.scrollY;
    if(offset > 200 ){
      setScrolled(true);
    }
    else{
      setScrolled(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll',handleScroll)
  },[])
  let navbarClasses=[ 'navbar', 'navbar-inverse'];
  if(scrolled){
    //navbarClasses.push('navbar-light');
    navbarClasses=['fixed-top','sticky-top', 'navbar-inverse'];
  }
  

  return(
    <nav class={navbarClasses.join(" ")}>
  <div class="container-fluid1">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar" onClick={handleNavCollapse}>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <Link href="/">
      <a class="navbar-brand">Local->Global Translator</a>
      </Link>
    </div>
    {/*<div class="collapse navbar-collapse" id="myNavbar">*/}
    <div class={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarsExample09">
      <ul class="nav navbar-nav">
        <li class={route == "/" || ((route.charAt(0)=="/") && (route.charAt(1) =="?")) ? "active" : ""} onClick={handleNavCollapse}>
        <Link href="/">
        <a>
        <span class="glyphicon glyphicon-home"></span>{' '}
        Home
        </a>
        </Link>
        </li>
        <li class={route.search("/languages") >= 0 ? "active" : ""} onClick={handleNavCollapse}>
        <Link href="/languages">
        <a>languages</a>
        </Link>
        </li>
        
        <li class={route.search("/most-search") >= 0 ? "active" : ""} onClick={handleNavCollapse}>
        <Link href="/most-search">
        <a>most search</a>
        </Link>
        </li>
        
        <li class={route == "/translate/add" ? "active" : ""} onClick={handleNavCollapse}>
        <Link href="/translate/add">
        <a>Add word</a>
        </Link>
        </li>
      
      
      
      
      {/*<ul class="nav navbar-nav navbar-right">*/}
      
      
      {session ? 
      
      <>
        <li class={route.search("/account") >= 0 ? "active" : ""} onClick={handleNavCollapse}>
        <Link href="/account">
        <a>
        <span class="glyphicon glyphicon-user"></span>{" "}
          Account {session.user.username}
        </a>
       </Link> 
        </li>
        
        <li class={""} onClick={(e)=>{
            e.preventDefault()
            signOut();
            handleNavCollapse(e);
          }
        }>
        <a>
        <span class="glyphicon glyphicon-log-out"></span> 
        {' '}Logout
        </a>
        </li>
        </>
        
        :
        
        <>
        <li class={route == "/register" ? "active" : ""} onClick={handleNavCollapse}>
        <Link href="/register">
        <a>
        <span class="glyphicon glyphicon-user"></span> 
        {' '}Sign Up
        </a>
        </Link>
        </li>
        
        
        <li class={route == "/login" ? "active" : ""} onClick={handleNavCollapse}>
        <Link href="/api/auth/signin">
        <a>
        <span class="glyphicon glyphicon-log-in"></span> 
        Login
        </a>
        </Link>
        </li>
        </>
      }
      </ul>
    </div>
  </div>
<div class="navbar-header container">
<form class="navbar-form navbar-left" onSubmit={handleSubmit}>
  <div class="input-group">
    <input type="text" class="form-control" onChange={handleChange} placeholder="Search" value={searchText}/>
    <div class="input-group-btn">
      <button class="btn btn-default" type="submit">
        <i class="glyphicon glyphicon-search"></i>
      </button>
    </div>
  </div>
</form>
</div>
</nav>
    )
}
