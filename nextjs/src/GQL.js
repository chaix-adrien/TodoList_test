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

const CREATE_TASK = gql`
  mutation CreateTaskMutation($listId: ID!, $title: String) {
    createTask(listId: $listId, title: $title) {
      _id
      title
      tasks {
        title
        _id
      }
    }
  }
`

const CREATE_LIST = gql`
  mutation CreateListMutation($title: String) {
    createList(title: $title) {
      _id
      title
      tasks {
        title
        _id
      }
    }
  }
`
const DELETE_LIST = gql`
  mutation DeleteListMutation($listId: ID!) {
    deleteList(listId: $listId) {
      _id
      title
      tasks {
        _id
        title
      }
    }
  }
`

const DELETE_TASK = gql`
  mutation DeleteTaskMutation($taskId: ID!) {
    deleteTask(taskId: $taskId) {
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
  CREATE_LIST,
  DELETE_LIST,
  DELETE_TASK,
  CREATE_TASK,
}
