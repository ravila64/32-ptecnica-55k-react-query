// cambio page:number x pageParam
export const fetchUsers = async ({ pageParam = 1 }: { pageParam?: number }) => {
    return await fetch('https://randomuser.me/api?results=10&seed=midudev&page=${pageParm}')
        // v.2.
        .then(async res=>{
          console.log("Page now pageParam ", pageParam)
          console.log("status of res.ok ", res.ok, " res.status ", res.status, " res.statusText ", res.statusText)
          if(!res.ok) throw new Error('Error en la petición')
          return await res.json()   // revisar si retorna un objeto, con nextCursor
        })
        //.then(res=>res.results)
        .then(res=>{
          const currentPage = Number(res.info.page)
          const nextCursor =  currentPage>3 ? undefined : currentPage + 1;
          return {
            users: res.results,
            nextCursor
           }  // return promise
        })
  }