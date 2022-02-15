import { QueryClient, QueryClientProvider, useQuery, useInfiniteQuery } from 'react-query'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
 
const queryClient = new QueryClient()

const InfiniteQuery = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Example/>
    </QueryClientProvider>
  )
}

export default InfiniteQuery

function Example(): JSX.Element {
    
    const target = useRef<HTMLDivElement | null>(null);

    const {
        isLoading,
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching
    } = useInfiniteQuery(
        "query",
        async() => {
            const {data} = await axios.get('https://jsonplaceholder.typicode.com/users')
            console.log(data)
            return data
        },
        {
            getNextPageParam: () => {
                return 1;
            }
        }
    )

        console.log("next :::::",hasNextPage)

        useEffect(() => {
            console.log('target', target.current);

            let options = {
                root: null,
                rootMargin: '0px',
                threshold: 1.0
            }

            const observer = new IntersectionObserver(
                (entries) => entries.forEach((entry) => entry.isIntersecting && fetchNextPage())
            );


            if (!target.current) return;

            observer.observe(target.current);

            return () => {
                if (target.current) observer.unobserve(target.current)
            }
        },[hasNextPage])

        if (!data) return <div>no data</div>;
        if (isLoading) return <div>Loading....</div>
        if (error) return <div>에러</div>

        const items = data.pages.flat(Infinity)

        // const items = data.pages.flatMap((page) => [...page])

    return (
        <>
        {
            items.map((item,index) => {
                return (
                    <div key={index} style={{marginTop:"50px"}}>{item.name}</div>
                )
            })
        }
        {isFetching && <div>Loading....</div>}
            <div ref={target}></div>
        </>
    )
}