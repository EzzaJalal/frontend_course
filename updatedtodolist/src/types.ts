export type Todo = {
    description: string,
    duedate: string,
    priority: string
}

export type TableProps = {
    todos: Todo[],
    handleDelete: (row: number) => void;
}
