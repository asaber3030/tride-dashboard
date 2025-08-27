"use client"

import qk from "@/lib/query-keys"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { useRideGroupChat } from "../_helpers/hooks"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { createRideGroupChatAction } from "../_helpers/actions"
import { handleError, showResponse } from "@/lib/utils"

import { MessageCircleIcon } from "lucide-react"
import { FullRideGroup } from "@/types/models"
import { LoadingButton } from "@/components/common/loading-button"
import { LinkBtn } from "@/components/common/link-button"
import { Button } from "@/components/ui/button"

type Props = {
  group: FullRideGroup
  children?: React.ReactNode
}

export const CreateChatForRideGroupModal = ({ children, group }: Props) => {
  const qc = useQueryClient()

  const { data: chat, isLoading: isChatLoading, refetch } = useRideGroupChat(group.id)

  const mutation = useMutation({
    mutationFn: () => createRideGroupChatAction(group.id),
    onSuccess: (data) =>
      showResponse(data, () => {
        qc.invalidateQueries({ queryKey: qk.rideGroups.singleChat(group.id) })
        refetch()
      }),
    onError: (error) => handleError(error)
  })

  const onCreate = () => {
    mutation.mutate()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children ? children : <Button icon={MessageCircleIcon} variant='outline' />}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Or Check Ride Group Chat</DialogTitle>
        </DialogHeader>

        <div>
          <DialogDescription>
            {isChatLoading ? (
              "Checking for existing chat..."
            ) : (
              <>
                {chat ? (
                  <div>
                    <p>Chat already exists. You can access it below:</p>
                    <LinkBtn href={`/dashboard/chats/ride_group/${chat._id}`} className='mt-2'>
                      Go to Chat
                    </LinkBtn>
                  </div>
                ) : (
                  <LoadingButton onClick={onCreate} className='mt-2' loading={mutation.isPending}>
                    Create Chat
                  </LoadingButton>
                )}
              </>
            )}
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  )
}
