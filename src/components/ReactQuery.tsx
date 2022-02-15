import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import axios from 'axios'
 
const queryClient = new QueryClient()

const ReactQuery = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Example/>
    </QueryClientProvider>
  )
}

export default ReactQuery





function Example(): JSX.Element {

    const {isLoading , error, data } = useQuery<boolean, any, any, "repoData">("repoData", async () => {
        const {data} = await axios.get('https://jsonplaceholder.typicode.com/photos')
        return data
    }, {
        //...options
    })

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>'An error has occurred: ' + error.message </div>

  return (
      <>
          {
              data.map((item:any) => {
                  return (
                      <img key={item.id} src={item.url} />
                  )
              })
          }
      </>
  )
}