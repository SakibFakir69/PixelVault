'use client'



import { useRouter } from 'next/navigation';

function Error({error}:any) {
    console.log(error);
    const router = useRouter();

  return (
    <div>error

        <h1>Something went to wrong</h1>
        <button onClick={()=>router.back()}> back</button>
    </div>
  )
}

export default Error;