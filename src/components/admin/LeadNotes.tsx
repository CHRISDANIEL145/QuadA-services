'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Loader2, StickyNote } from 'lucide-react'
import { addLeadNote } from '@/actions/admin'
import { formatRelative, cn } from '@/lib/utils'

interface Note {
  id: string
  note: string
  created_at: string
  admins?: { full_name: string } | null
}

interface Props {
  leadId: string
  notes: Note[]
}

export function LeadNotes({ leadId, notes }: Props) {
  const [noteText, setNoteText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleAddNote = async () => {
    if (!noteText.trim()) return
    setIsSubmitting(true)
    try {
      const result = await addLeadNote(leadId, { note: noteText.trim() })
      if (result.success) {
        setNoteText('')
        toast.success('Note added')
        router.refresh()
      } else {
        toast.error(result.error || 'Could not save note.')
      }
    } catch {
      toast.error('An unexpected error occurred.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E5E9F2] p-5">
      <h2 className="font-semibold text-[#0D1526] text-sm mb-4 flex items-center gap-2">
        <StickyNote size={15} className="text-[#B8973E]" aria-hidden="true" />
        Notes ({notes.length})
      </h2>

      {/* Add note */}
      <div className="mb-5">
        <label htmlFor={`note-${leadId}`} className="sr-only">Add a note</label>
        <textarea
          id={`note-${leadId}`}
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          rows={3}
          placeholder="Add a note about this lead…"
          className="w-full px-4 py-3 text-sm rounded-xl border border-[#E5E9F2] bg-[#F8F9FC] focus:outline-none focus:border-[#253969]/40 focus:bg-white transition-all resize-none"
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={handleAddNote}
            disabled={isSubmitting || !noteText.trim()}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all',
              isSubmitting || !noteText.trim()
                ? 'bg-[#E5E9F2] text-[#A89E8E] cursor-not-allowed'
                : 'bg-[#0D1526] text-white hover:bg-[#1C2D4F]'
            )}
            aria-disabled={isSubmitting || !noteText.trim()}
          >
            {isSubmitting ? (
              <><Loader2 size={13} className="animate-spin" /> Saving…</>
            ) : (
              'Add Note'
            )}
          </button>
        </div>
      </div>

      {/* Notes list */}
      {notes.length === 0 ? (
        <div className="text-center py-6 text-[#A89E8E] text-sm">
          No notes yet. Add the first note above.
        </div>
      ) : (
        <ol className="space-y-3" aria-label="Lead notes">
          {notes.map((note) => (
            <li
              key={note.id}
              className="p-4 rounded-xl bg-[#F8F9FC] border border-[#E5E9F2]"
            >
              <p className="text-sm text-[#0D1526] leading-relaxed whitespace-pre-wrap">
                {note.note}
              </p>
              <div className="flex items-center gap-2 mt-2">
                {note.admins && (
                  <span className="text-[10px] font-medium text-[#B8973E]">
                    {note.admins.full_name}
                  </span>
                )}
                <span className="text-[10px] text-[#A89E8E]">
                  {formatRelative(note.created_at)}
                </span>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
