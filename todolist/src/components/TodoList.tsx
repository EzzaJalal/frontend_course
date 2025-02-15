import {useState} from "react";
import {Todo} from "../types";
import TodoTable from "./TodoTable";

function TodoList() {
    const [todo, setTodo] = useState<Todo>({
        description: '',
        duedate: ''
    });
    const [todos, setTodos] = useState<Todo[]>([]);

    const handleAdd = () => {
        if (!todo.description){
            alert("Enter some values first");
        }
        else {
            setTodos([todo, ...todos]);
            setTodo({description: '', duedate: ''});
        }
    }

    const handleDelete = (row: number) => {
        setTodos(todos.filter((_, index) => row != index)); //underscore means something is going in but not using
    }

    return(
        <>
          <h3>My Todo</h3>
          <input
             placeholder="Description"
             value={todo.description}
             onChange={e => setTodo({...todo, description: e.target.value})}
            />

             <input
             placeholder="Duedate"
             type="date"
             value={todo.duedate}
             onChange={e => setTodo({...todo, duedate: e.target.value})}
            />
            <button onClick={handleAdd}>Add</button>
            <TodoTable todos={todos} handleDelete={handleDelete}/>
            
        </>
    );
}

export default TodoList;