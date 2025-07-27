"use client"

import qk from "@/lib/query-keys"
import { useInfiniteQuery } from "@tanstack/react-query"
import React from "react"
import { getCustomerSupportChatMessages } from "../chats/_helpers/actions"

export default function TestPage() {
  const id = "68820cf0978cee52685c80bc"

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: qk.chats.chatMessages(id, {}, "customer_support"),
    queryFn: ({ pageParam = 1, queryKey }) => getCustomerSupportChatMessages(queryKey[2] as string, { page: pageParam }),
    getNextPageParam: (lastPage) => lastPage.pagination.nextPage ?? undefined,
    initialPageParam: 1
  })

  console.log("Data:", data)

  return (
    <div>
      <h1 className='text-2xl font-bold'>Test Page</h1>
      <p>Check the console for query results.</p>
      <button onClick={() => fetchNextPage()} className='mt-4 bg-blue-500 text-white px-4 py-2 rounded' disabled={!hasNextPage || isFetchingNextPage}>
        {isFetchingNextPage ? "Loading..." : hasNextPage ? "Load More" : "No More Data"}
      </button>
      <div className='mt-4'>
        <h2 className='text-xl font-semibold'>Messages:</h2>
        {data?.pages.map((page, index) => (
          <div key={index} className='mt-2'>
            {page.data.map((message) => (
              <div key={message._id} className='p-2 border-b'>
                <p>
                  <strong>
                    {message._id} # {message.message}{" "}
                  </strong>
                </p>
                <p className='text-gray-500 text-sm'>{new Date(message.created_at).toLocaleString()}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
