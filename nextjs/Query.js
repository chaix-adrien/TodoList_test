import { gql } from "@apollo/client"

const GET_LISTS = gql`
  query Query {
    lists {
      _id
      title
      tasks {
        title
        _id
      }
    }
  }
`

export default {
  GET_LISTS,
}
