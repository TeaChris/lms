'use client'

import { ConfirmModal } from '@/components/modals/ConfirmModal'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'

interface ChapterActionsProps {
  disabled: boolean
  courseId: string
  chapterId: string
  isPublished: boolean
}

export default function ChapterActions({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: ChapterActionsProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()

  const onClick = async () => {
    try {
      setIsLoading(true)

      if (isPublished) {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/unpublish`
        )
        toast.success('Chapter unpublished')
      } else {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/publish`
        )
        toast.success('Chapter published')
      }

      router.refresh()
    } catch {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setIsLoading(true)

      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`)

      toast.success('Chapter deleted')
      router.refresh()
      router.push(`/teacher/courses/${courseId}`)
    } catch {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant={'outline'}
        size={'sm'}
      >
        {isPublished ? 'Unpublished' : 'Publish'}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  )
}
