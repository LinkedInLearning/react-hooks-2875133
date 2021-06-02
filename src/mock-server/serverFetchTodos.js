import { fakeWait, getAllTodosImmediately, LOCALSTORAGE_KEY, randomId } from "./util";

/**
 * fetch all todos as an array 
 * @returns Array<{title, category}>
 */
export async function serverFetchTodos() {
    return fakeWait(() => {
        return getAllTodosImmediately();
    });
}