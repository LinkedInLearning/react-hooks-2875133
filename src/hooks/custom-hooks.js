import { useEffect } from "react";

export function useUpdatePageTitle(todos) {
  useEffect(() => {
    document.title = `Es gibt ${todos.length} Todos`;
  });
}
