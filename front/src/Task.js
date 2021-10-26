import { MdDeleteForever } from "react-icons/md"

const iconStyle = {
  fontSize: 30,
}

export default function Task(props) {
  const { task } = props
  const fake = task._id.includes("temporary")
  return (
    <div className="container">
      <h4 className="title">{task.title}</h4>
      {!fake && (
        <div className="icon-container" onClick={props.delete}>
          <MdDeleteForever style={iconStyle} />
        </div>
      )}
      <style jsx>{`
        .container {
          background-color: white;
          border-radius: 10px;
          padding: 10px;
          margin: 10px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        }

        .title {
          margin-left: 10px;
        }

        .icon-container {
          opacity: 0;
          transition: all 0.1s ease-out;
        }

        .container:hover .icon-container {
          opacity: 1;
          display: flex;
          align-items: center;
        }
      `}</style>
    </div>
  )
}
