import { g, auth, config } from '@grafbase/sdk'

const User = g.model('User', {
  name: g.string().length( {min: 3, max: 20}), 
  email: g.email().unique(), 
  avtarUrl: g.url(), 
  description: g.string(), 
  githubUrl: g.url().optional(), 
  linkedInUrl: g.url().optional(), 
  projects: g.relation()

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
