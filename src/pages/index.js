import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ComingSoon from "../components/coming-soon"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <ComingSoon />
  </Layout>
)

export default IndexPage
