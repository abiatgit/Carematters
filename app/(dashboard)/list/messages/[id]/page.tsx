import MessageClient from './MessageClient'

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function MessagePage(props: PageProps) {
  const params = await props.params
  const { id } = params
  
  return <MessageClient userId={id} />
}