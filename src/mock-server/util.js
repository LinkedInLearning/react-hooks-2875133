export const LOCALSTORAGE_KEY = 'lil-react-hooks-todos';

export async function fakeWait(fnToExecute) {
    return new Promise(resolve => {
        setTimeout(() => resolve(fnToExecute()), 150 + Math.floor(Math.random() * 200));
    });
}

export async function getAllTodosImmediately() {
    const todos = localStorage.getItem(LOCALSTORAGE_KEY);
    let returnValue = [];

    if (todos) {
        returnValue = JSON.parse(todos);
    }

    return returnValue;
}

export function clearAllTodos() {
    localStorage.removeItem(LOCALSTORAGE_KEY);
}

export function randomId() {
    if (crypto) {
        return crypto.getRandomValues(new Uint32Array(3)).join('-');
    } else {
        return `${Math.floor(Math.random() * 10000000)}-${Math.floor(Math.random() * 10000000)}-${Math.floor(Math.random() * 10000000)}`;
    }
}
