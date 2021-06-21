import { fakeWait, getAllTodosImmediately } from "./util";

/**
 * fetch all todos as an array 
 * @returns Array<{title, category}>
 */
export async function serverFetchTodos() {
    return fakeWait(() => {
        return getAllTodosImmediately();
    });
}