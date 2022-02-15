import { QueryClient, QueryClientProvider, useQuery, useInfiniteQuery } from 'react-query'
import axios from 'axios'
import { useEffect, useRef } from 'react'
import React from 'react'
 
const queryClient = new QueryClient()

const ReactQuery = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Example/>
    </QueryClientProvider>
  )
}

export default ReactQuery


const Item = React.memo(function Item({name}: {name: string}) {
  return <div style={{marginTop: "200px"}}>{name}</div>
});

const List = React.memo(({items} : {items: any[]}) => {
  return <div style={{height: '1000px'}}>
  {
      items && items.map((item: any, index) => {
          return (
              // <img key={item.id} src={item.url} />
              <Item name={item.name} key={index}></Item>
          )
      })
  }
</div>
})



function Example(): JSX.Element {

  const {
    isLoading,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    "movies",
    async () => {
      const {data} = await axios.get('https://jsonplaceholder.typicode.com/users');
      return data;
    },
    {
      getNextPageParam: () => {
        return 0;
      },
    });

    let target = useRef<HTMLDivElement>(null);

    useEffect(() => {
      console.log(target.current)
      let options = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      }

      const observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => entry.isIntersecting && fetchNextPage()),
        options
      );

      // let observer = new IntersectionObserver(() => fetchNextPage, options);
      const el = target && target.current;

      if (!el) return;
      
      observer.observe(el);

      return () => {
        observer.unobserve(el);
      }
    },[])
  


  
    // const {isLoading , error, data } = useQuery<boolean, any, any, "repoData">("repoData", async () => {
    //     const {data} = await axios.get('https://jsonplaceholder.typicode.com/users')
    //     return data
    // }, {
        
    // })



  // console.log(data?.pages)
  if (isLoading) return <div>Loading...</div>

  if (error) return <div>'An error has occurred: ' + error.message </div>

  if(isFetchingNextPage) {
    console.log('return <div>isFetchingNextPage</div>');
    return <div>isFetchingNextPage</div>
  }

  if(data?.pages.length === 0) return <div>data</div>

  const items = data?.pages.flatMap((page) => [...page]);
  console.log(items)

  
  return (
      <>
        {items && (
          <div>  
            <List items={items} />
            <div id="aa" ref={target}></div>
          </div>
          )}  
      </>
  )
}