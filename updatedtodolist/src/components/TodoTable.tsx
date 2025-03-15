import {TableProps} from "../types";

function TodoTable(props: TableProps) {
   return (
    <table>
            <thead>
               <tr>
                  <th>Description</th>
                  <th>Duedate</th>
                  <th>Action</th>
               </tr>
            </thead>
            <tbody>
               {
                 props.todos.map((todo, index) => 
                <tr key={index}>
                  <td>{todo.description}</td>
                  <td>{todo.duedate}</td>
                  <td>
                      <button onClick={() => props.handleDelete(index)}>
                          Delete
                      </button>
                  </td>
                </tr>
              )
          }
            </tbody>
            </table>
   );
}
export default TodoTable;