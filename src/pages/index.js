import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"

export const repos = graphql`
  query repos {
    github {
      search(query: "org:debtcollective", type: REPOSITORY, first: 50) {
        repositoryCount
        edges {
          node {
            ... on GitHub_Repository {
              name
              description
              languages(first: 10) {
                edges {
                  node {
                    name
                  }
                }
              }              
              stargazers {
                totalCount
              }
            }
          }
        }
      }
    }
  }
`

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home"/>
    <h1 className="mx-5">{data.github.search.repositoryCount} Repos</h1>
    <div className="flex flex-wrap">
      {data.github.search.edges.map(({ node: repo }) =>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 border border-gray-400 rounded-md m-4 p-3 ">
          <div className="font-bold">{repo.name}</div>
          <hr className="mb-2"/>
          <div className="text-sm mb-2">{repo.description}</div>
          <div className="text-sm mb-2">
            {repo.languages.edges.map(({ node: lang}) =>
              <span className="inline-block pr-1">{lang.name}</span>)}
          </div>
          <div className="text-sm">★ {repo.stargazers.totalCount}</div>
        </div>
      )}
    </div>
  </Layout>
)

export default IndexPage
