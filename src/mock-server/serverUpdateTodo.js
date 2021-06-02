import { fakeWait, getAllTodosImmediately, LOCALSTORAGE_KEY } from "./util";

export async function serverUpdateTodo(todoId, updatedTodoObj) {
    return fakeWait(async () => {
        const allItems = await getAllTodosImmediately();
        const updatedItems = allItems.map( todoObj => {
            if (todoObj.id === todoId) {
                return updatedTodoObj;
            } else {
                return todoObj;
            }
        });

        console.log({updatedItems, updatedTodoObj})

        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(updatedItems));
        return getAllTodosImmediately();
    });
}