"use client"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Something went wrong!</h2>
      <p className='bg-red-100 text-red-800 p-4 rounded mb-4 text-wrap'>{error?.message || "Unknown error has occured"}</p>
      <button onClick={() => reset()} className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'>
        Try again
      </button>
    </div>
  )
}
