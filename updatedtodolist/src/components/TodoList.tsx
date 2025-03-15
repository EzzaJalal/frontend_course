import {useRef, useState} from "react";
import {Todo} from "../types";
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, ColDef, themeMaterial } from 'ag-grid-community'; 
import Button from '@mui/material/Button'; 
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


ModuleRegistry.registerModules([AllCommunityModule]);

function TodoList() {
    const [todo, setTodo] = useState<Todo>({
        description: '',
        duedate: '',
        priority: ''
    });
    const [todos, setTodos] = useState<Todo[]>([]);

    const [colDefs] = useState<ColDef[]>([
        {field: "description", filter: "agTextColumnFilter", floatingFilter: true},
        {field: "duedate", headerName: "Date",  filter: "agTextColumnFilter", floatingFilter: true,},
        {field: "priority", filter: "agTextColumnFilter", floatingFilter: true,
         cellStyle: (params) => params.value === "High" ? {color: 'red'} : {color: 'black'}
        }
       
    ]);

    const gridRef = useRef<AgGridReact<Todo>>(null);

    const handleAdd = () => {
        if (!todo.description){
            alert("Enter some values first");
        }
        else {
            setTodos([todo, ...todos]);
            setTodo({description: '', duedate:'', priority: ''});
        }
    }

    /*const handleDelete = (row: number) => {
        setTodos(todos.filter((_, index) => row != index)); //underscore means something is going in but not using
    }*/

    const handleDelete = () => {
        if(gridRef.current && gridRef.current.api.getSelectedNodes().length > 0) {
        setTodos(
            todos.filter(
                (_todo, index) => index !== Number(gridRef.current?.api.getSelectedNodes()[0].id)
                )
            )
        } else {
        alert ("Select a row first!")
        }
    }

    const handleDateChange = (date: dayjs.Dayjs | null) => {
        if (date) {
            setTodo({ ...todo, duedate: date.format("YYYY-MM-DD") });
        }
    };

    return(
        <>
          
          <Stack mt ={2} direction="row" spacing= {2} alignItems= "center" justifyContent= "center">
          <TextField
             label="Description"
             value={todo.description}
             onChange={e => setTodo({...todo, description: e.target.value})}
            />
            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                    label="Duedate"
                    value={todo.duedate ? dayjs(todo.duedate) : null}
                    onChange={handleDateChange}
                />
            </LocalizationProvider>
            

            <TextField
                select
                label="Priority"
                value={todo.priority}
                onChange={e => setTodo({ ...todo, priority: e.target.value })}
                style={{ width: 200 }}
            >
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
            </TextField>

            <Button variant= "contained" onClick={handleAdd}>Add</Button>
            <Button variant= "contained" color="error" onClick={handleDelete}>Delete</Button>
            </Stack>

            <div style={{width: 700, height: 500}}>
            <AgGridReact
             rowData={todos}
             rowSelection="single"
             ref={gridRef}
             columnDefs={colDefs}
             theme= { themeMaterial }
             animateRows={true}
             />
            </div>

            
        </>
    );
}

export default TodoList;