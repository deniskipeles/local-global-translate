
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {url} from '../../../global_to_local_dict_lib/rootUrl'
import fetch from 'node-fetch'


const authHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  providers: [
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      id: "credentials",
      name: "credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "username", type: "text", placeholder: "enter username" },
        password: {  label: "Password", type: "password" }
      },
      authorize: async (credentials, req) => {
        // Add logic here to look up the user from the credentials supplied
        // const user = { id: 1, name: "J Smith", email: "jsmith@example.com" }
        const user=await fetch(`${url}/api-token-auth/`, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
          .then(async(json) => {
            //console.log(json)
            if(json.token){
            const res=await fetch(`${url}/account/?search=${credentials.username}`).then(data=>data.json());
            //console.log(res.results[0]);
            return res.results[0];
            }else{
              return null
            }
          })
          .catch(err => null);
        //console.log("data",user)

        
        if (user != null) {
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    }),
  ],
callbacks: {
  async jwt({ token, account, user }) {
    // Persist the OAuth access_token to the token right after signin
    //console.log(user);
    if (account) {
      token.accessToken = account.access_token
    }
    if (user) {
      //token.url = user.url
      token.user = user
    }
    return token
  },
  async session({ session, token, user }) {
    // Send properties to the client, like an access_token from a provider.
    //session.url = token.url
    session.user = token.user
    session.accessToken = token.accessToken
    return session
  }
},
secret: "process.env.NEXTAUTH_SECRET",
};


