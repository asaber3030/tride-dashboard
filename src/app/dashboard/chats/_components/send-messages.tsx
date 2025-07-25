import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Smile, Paperclip, Send } from "lucide-react"

type Props = {
  file: File | null
  message: string
  setFile: React.Dispatch<React.SetStateAction<File | null>>
  setMessage: React.Dispatch<React.SetStateAction<string>>
  handleSendMessage: () => void
  handleKeyPress: (e: React.KeyboardEvent) => void
}

export const SendMessages = ({ file, setFile, message, handleKeyPress, handleSendMessage, setMessage }: Props) => {
  return (
    <div className='p-4 border-t border-gray-200'>
      <div className='flex items-center bg-gray-100 rounded-full px-4 py-1'>
        <Input type='text' placeholder='Write your message' className='flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0' value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={handleKeyPress} />
        <div className='flex items-center space-x-1'>
          {/*           <Button variant='ghost' size='icon' className='text-gray-500 hover:text-gray-700'>
            <Smile className='h-5 w-5' />
          </Button> */}
          <div className='relative'>
            <Button variant='ghost' size='icon' className='text-gray-500 hover:text-gray-700'>
              <Paperclip className='h-5 w-5' />
            </Button>
            {/* <input type='file' accept='image/*,video/*,audio/*' className='absolute inset-0 opacity-0 cursor-pointer' onChange={(e) => setFile(e.target.files?.[0] ? e.target.files?.[0] : null)} /> */}
          </div>
          <Button size='icon' className='bg-orange-500 hover:bg-orange-600 text-white rounded-full h-8 w-8' onClick={handleSendMessage}>
            <Send className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}
