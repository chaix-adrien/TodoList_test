import Task from "./Task"
import { useMutation } from "@apollo/client"
import { useState } from "react"

import Query from "./GQL"
import { MdCheckCircle, MdDeleteForever } from "react-icons/md"

const iconStyle = {
  fontSize: 25,
  marginLeft: 10,
  cursor: "pointer",
}

export default function List(props) {
  const { list } = props
  const [newTitle, setNewTitle] = useState("")
  const [deleteTask] = useMutation(Query.DELETE_TASK)
  const [createTask] = useMutation(Query.CREATE_TASK)

  const onCreateTask = function () {
    createTask({
      variables: { title: newTitle, listId: list._id },
      optimisticResponse: {
        createTask: {
          ...list,
          tasks: list.tasks.concat([{ title: newTitle, _id: "temporary" + Math.random() }]),
        },
      },
    })
    setNewTitle("")
  }

  return (
    <div className="container">
      <div className="top">
        <h1 className="title">{list.title}</h1>
        <div className="icon-container" onClick={props.delete}>
          <MdDeleteForever style={iconStyle} />
        </div>
      </div>
      <div className="list-container">
        {list.tasks.map((task) => (
          <Task
            task={task}
            key={task._id}
            delete={() =>
              deleteTask({
                variables: { taskId: task._id },
                optimisticResponse: {
                  deleteTask: { ...list, tasks: list.tasks.filter((t) => t._id !== task._id) },
                },
              })
            }
          />
        ))}
      </div>
      <div className="input-container">
        <input
          className="input"
          placeholder="Ajouter une tache..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? onCreateTask() : null)}
        />
        {newTitle.length > 1 && (
          <div
            onClick={() => {
              onCreateTask()
            }}>
            <MdCheckCircle style={iconStyle} />
          </div>
        )}
      </div>
      <style jsx>{`
        .container {
          background-color: white;
          border-radius: 10px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin: 10px;
          margin-top: 30px;
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
          width: 400px;
          max-width: 90vw;
          max-height: 80vh;
        }
        .top {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }

        .icon-container {
          opacity: 0;
        }

        .container:hover .icon-container {
          opacity: 1;
          display: flex;
          align-items: center;
        }

        .input {
          display: flex;
          width: 100%;
          height: 30px;
        }
        .input-container {
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
          padding: 10px;
          flex-direction: row;
          display: flex;
        }
        .title {
          margin-left: 10px;
        }

        .icon {
          font-size: 25px;
        }

        .list-container {
          overflow: auto;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
      `}</style>
    </div>
  )
}
