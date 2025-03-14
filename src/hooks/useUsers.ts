import { useInfiniteQuery } from "@tanStack/react-query";
import { fetchUsers } from "../services/users";
import { type User } from "../types/types.d";

export const useUsers = () =>{

    const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery<{ nextCursor?: number, users: User[] }>(
        ['users'], // <- la key de la información o de la query
        fetchUsers,
        {
          getNextPageParam: (lastPage) => lastPage.nextCursor
        //   refetchOnWindowFocus: false,
        //   staleTime: 1000 * 3
        }
      )
      return {
        refetch,
        fetchNextPage,
        isLoading,
        isError,
        users: data?.pages.flatMap(page=>page.users) ?? [],
        hasNextPage
      }
}

