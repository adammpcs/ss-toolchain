import gql from 'graphql-tag'

export const fragments = {
  text: `
    ... on TextRecord {
      id
      content
    }
  `,
  gallery: `  
    ... on GalleryRecord {
      id
      images {
        alt
        height
        size
        title
        url
        width
      }
    }
  `,
  pdf: `  
    ... on PdfEmbedRecord {
    id
    document {
      alt
      format
      height
      size
      title
      url
      width
    }
  }
  `,
  carousel: `  
    ... on CarouselRecord {
    id
    images {
      alt
      height
      size
      title
      url
      width
    }
  }
  `,
  threeColumn: `  
    ... on ThreeColumnFeatureRecord {
      id
    column1
    column1Image {
      alt
      height
      size
      title
      url
      width
    }
    column2
    column2Image {
      alt
      height
      size
      title
      url
      width
    }
    column3
    column3Image {
      alt
      height
      size
      title
      url
      width
    }
  }
  `,
  feature: `  
    ... on FeatureCalloutRecord {
    id
    text
    backgroundColor { hex }
    backgroundImage {
      alt
      height
      size
      title
      url
      width
    }
  }
  `,
  pageLink: `
    ... on PageRecord {
      id
      title
      slug
    }
  `,
  newsLink: `
    ... on NewsRecord {
      id
      title
      slug
    }
  `
}

export const MAIN_MENU_QUERY = gql`
  {
    menuPrimaryNavigation {
      links {
        ${fragments.pageLink}
        ${fragments.newsLink}
      }
    }
  }
`

export const FOOTER_MENU_QUERY = gql`
  {
    menuFooter {
      links {
        ${fragments.pageLink}
        ${fragments.newsLink}
      }
    }
  }
`

export const NEWS_QUERY = gql`
  {
    allNews {
      id
      _createdAt
      featuredImage {
        title
        id
        url
      }
      content
      slug
      title
    }
  }
`

export const NEWS_ITEM_QUERY = gql`
  query News($slug: String!) {
  news(filter: { slug: {
    eq: $slug
  } }) {
      id
      _createdAt
      featuredImage {
        title
        id
        url
      }
      content
      slug
      title
      seo {
        title,
        description,
        image {
          alt
          height
          size
          title
          url
          width
        }
      }
    }
  }
`

export const PAGE_QUERY = gql`
  query Page($slug: String!) {
    page(filter: { slug: {
      eq: $slug
    } }) {
      title
      featuredImage {
        alt
        height
        size
        title
        url
        width
      }
      metaTags {
        title,
        description,
        image {
          alt
          height
          size
          title
          url
          width
        }
      }
      content {
        ${fragments.text}
        ${fragments.gallery}
        ${fragments.carousel}
        ${fragments.pdf}
        ${fragments.threeColumn}
        ${fragments.feature}
      }
    }
  }  
`
