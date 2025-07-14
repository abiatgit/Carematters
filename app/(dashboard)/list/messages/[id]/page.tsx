import MessageClient from './MessageClient'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function MessagePage({ params }: PageProps) {
  const { id } = await params;
  
  return <MessageClient userId={id} />
}