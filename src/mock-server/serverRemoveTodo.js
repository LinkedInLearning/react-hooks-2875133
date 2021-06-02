import { fakeWait, getAllTodosImmediately, LOCALSTORAGE_KEY } from "./util";

export async function serverRemoveTodo({ id: deletionId }) {
    return fakeWait(async () => {
        const allItems = await getAllTodosImmediately();
        const filteredTodos = allItems.filter(({id: _storedId}) => _storedId !== deletionId);

        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(filteredTodos));
        return getAllTodosImmediately();
    });
}