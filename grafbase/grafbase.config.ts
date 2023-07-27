import { g, auth, config } from '@grafbase/sdk'
import { getRSCModuleInformation } from 'next/dist/build/analysis/get-page-static-info'

// Welcome to Grafbase!
// Define your data models, integrate auth, permission rules, custom resolvers, search, and more with Grafbase.
//
// const authProvider = auth.OpenIDConnect({
//   issuer: process.env.ISSUER_URL ?? ''
// })

const jwt = auth.JWT({
  //jwt for auth needs two variables: issuer and secret 
  issuer: 'grafbase',
  //to get the secret, on mac/linux it is recommended by grafbase to run: $ openssl rand -base64 32 --> this will generate random 32 bit value 
  //store this secret in the grafbase folder .env file, and also in the regular top-level directory .env file
  secret: g.env('NEXTAUTH_SECRET')
})

// Define Data Models
// https://grafbase.com/docs/database

//@ts-ignore
const User = g.model('User', {
  name: g.string().length( {min: 3, max: 20}), 
  email: g.email().unique(), 
  avatarUrl: g.url(), 
  description: g.string().optional(), 
  githubUrl: g.url().optional(), 
  linkedInUrl: g.url().optional(), 
  projects: g.relation(() => Project).list().optional() // user 1 <---> 0..* project
}).auth((rules) => {
  rules.public().read()
})

//@ts-ignore
const Project = g.model('Project', {
  title: g.string().length({min: 3, max: 25}), 
  description: g.string(), 
  image: g.url(), 
  liveSiteUrl: g.url(), 
  githubUrl: g.url(), 
  category: g.string().search(), 
  createdBy: g.relation(() => User)
}).auth((rules) => {
  rules.public().read(), 
  rules.private().create().delete().update()
})

// Integrate Auth
// https://grafbase.com/docs/auth
// auth: {
//   providers: [authProvider] //select provider you want,
//   rules: (rules) => {
//     rules.private()
//   }
// }
export default config({
  schema: g, 
  auth: {
    providers: [jwt], 
    rules: (rules) => { rules.private()} //set all functionalities of the app to be private
  }

})
