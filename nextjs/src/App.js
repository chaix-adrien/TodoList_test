import { useQuery } from "@apollo/client"
import Query from "./GQL"
import List from "./List"
import { useState } from "react"
import { useMutation } from "@apollo/client"

export default function App() {
  const { loading, error, data } = useQuery(Query.GET_LISTS)
  const [createList] = useMutation(Query.CREATE_LIST, {
    refetchQueries: [Query.GET_LISTS],
    update(cache, mutationResult) {
      cache.modify({
        fields: {
          lists: (previous, second) => [...previous, second.toReference(mutationResult.data.createList)],
        },
      })
    },
  })
  const [deleteList] = useMutation(Query.DELETE_LIST, {
    refetchQueries: [Query.GET_LISTS],
    update(cache, mutationResult) {
      cache.modify({
        fields: {
          lists: (previous) => previous.filter((l) => !l.__ref.includes(mutationResult.data.deleteList._id)),
        },
      })
    },
  })

  const [filter, setFilter] = useState("")
  const filteredList = function () {
    if (!filter) return data.lists
    return data.lists.filter((l) => l.title.includes(filter))
  }

  return (
    <div className="container">
      <div className="search-container">
        <input placeholder="Cherchez une liste ou créez là" className="input" value={filter} onChange={(e) => setFilter(e.target.value)} />
        {!loading && !filteredList().length && (
          <div
            className="create-buton"
            onClick={() => {
              createList({
                variables: { title: filter },
                optimisticResponse: {
                  createList: { __typename: "List", _id: "temp_id" + Math.random(), title: filter, tasks: [] },
                },
              })
              setFilter("")
            }}>
            <h3 className="create">Créer la liste</h3>
          </div>
        )}
      </div>
      <div className="lists-container">
        {loading && <h1>Chargement ...</h1>}
        {!loading &&
          filteredList().map((list) => (
            <List
              list={list}
              key={list._id}
              delete={() =>
                deleteList({
                  variables: { listId: list._id },
                  optimisticResponse: {
                    deleteList: list,
                  },
                })
              }
            />
          ))}
      </div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          width: 100%;
        }
        .lists-container {
          display: flex;
          flex-wrap: wrap;
          flex-direction: row;
        }
        .search-container {
          background-color: white;
          border-radius: 10px;
          margin: 10px;
          margin-top: 20px;
          height: 10vh;
          padding: 10px;
          display: flex;
          flex-direction: row;
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        }

        .input {
          width: 100%;
          height: 100%;
          font-size: 20px;
          border-radius: 10px;
          padding-left: 10px;
        }

        .create-buton {
          width: 200px;
          background-color: green;
          justify-content: center;
          align-center: center;
          text-align: center;
          cursor: pointer;
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
          margin: 5px;
          border-radius: 10px;
        }
        .create {
          color: white;
        }
      `}</style>
    </div>
  )
}
