import { fakeWait, getAllTodosImmediately, randomId, LOCALSTORAGE_KEY } from "./util";

export async function serverAddTodo({title, category}) {
    return fakeWait(async () => {
        const todos = await getAllTodosImmediately();
        const id = randomId();
        const timestamp = new Date().getTime();
        const newTodos = [...todos, { id, title, category, timestamp }];

        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newTodos));

        return getAllTodosImmediately();
    });
}