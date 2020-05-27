
Gatsby starter readme is [here](gatsby.README.md)

## About

A demo app that uses Gatsby to fetch and display the Debt Collective's public repos using GitHub's GraphQL API.

## 🚀 Quick start
* `npm install`
* install Gatsby CLI if you don't already have it: `npm install -g gatsby-cli`
* `export GITHUB_TOKEN=<a valid GitHub API token>`
* `gatsby develop`

## 🧐 Implementation details

This is basically a boilerplate Gatsby application that utilizes the 
[gatsby-source-graphql](https://www.gatsbyjs.org/packages/gatsby-source-graphql) plugin to shim
the GitHub GraphQL schema into the local Gatsby schema under the `github` field. With this the GitHub
Graphql API can be queried by the client like so: 

```graphql
query REPOS {
  github {
    search(query: "org:jacobheric", type: REPOSITORY, first: 50) {
      repositoryCount
      edges {
        node {
          ... on GitHub_Repository {
            name
            languages(first: 10) {
              edges {
                node {
                  name
                }
              }
            }
            description
            stargazers {
              totalCount
            }
          }
        }
      }
    }
  }
}
```

See the`gatsby-source-graphql` plugin resolver in [gatsby-config.js](gatsby-config.js) for configuration detail. The only 
really interesting thing there is that it expects the GitHub auth token to be present in the env (see quick start above).

I used the [Tailwind CSS]((https://tailwindcss.com/)) utility framework for styling. I use Tailwind often as
it's unopinionated and gives you a lot without having to write any custom CSS. 

Tailwind is integrated by [PostCSS](https://postcss.org/). See: [postcss.config.js](postcss.config.js). Tailwind _does_ 
produce overly large CSS by default so I use [PurgeCSS](https://purgecss.com/) to reduce the size for deployment. 
See [tailwind.config.js](tailwind.config.js) for the purge configuration. 

The only custom code I added to the boilerplate starter is [here](src/pages/index.js). It's really straightforward. 
The Graphql query string is defined inline and the results are fetched in real time (not statically at build time). 
The results are displayed in a simple, responsive CSS flexbox using Tailwind.    

## TODO
* add tests via Jest: https://gatsby.dev/unit-testing
* add husky precommit hooks for linting and testing
