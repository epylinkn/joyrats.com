import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEOBlog from '../components/seo-blog'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEOBlog
          title="All posts"
          keywords={[`play`, `anthony`, `thesis`, `blog`]}
        />

        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug} style={{ textAlign: `center`, marginBottom: 20 }}>
              <small style={{ textTransform: `uppercase` }}>
              {node.frontmatter.date} | {node.frontmatter.category}
              </small>

              <br/>

              <h3>
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMM DD")
            title
            category
          }
        }
      }
    }
  }
`
