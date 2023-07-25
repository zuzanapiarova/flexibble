import { g, auth, config } from '@grafbase/sdk'
import { getRSCModuleInformation } from 'next/dist/build/analysis/get-page-static-info'

const User = g.model('User', {
  name: g.string().length( {min: 3, max: 20}), 
  email: g.email().unique(), 
  avtarUrl: g.url(), 
  description: g.string().optional(), 
  githubUrl: g.url().optional(), 
  linkedInUrl: g.url().optional(), 
  projects: g.relation(() => Project).list().optional() // user 1 <---> 0..* project
})

const Project = g.model('Project', {
  title: g.string().length({min: 3, max: 25}), 
  description: g.string(), 
  image: g.url(), 
  liveSiteUrl: g.url(), 
  githubUrl: g.url(), 
  category: g.string().search(), 
  createdBy: g.relation(() => User)
})

// Welcome to Grafbase!
// Define your data models, integrate auth, permission rules, custom resolvers, search, and more with Grafbase.
// Integrate Auth
// https://grafbase.com/docs/auth
//
// const authProvider = auth.OpenIDConnect({
//   issuer: process.env.ISSUER_URL ?? ''
// })
//
// Define Data Models
// https://grafbase.com/docs/database


export default config({
  schema: g
  // Integrate Auth
  // https://grafbase.com/docs/auth
  // auth: {
  //   providers: [authProvider],
  //   rules: (rules) => {
  //     rules.private()
  //   }
  // }
})
