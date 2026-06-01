'use client'

import { useEffect, useMemo, useState } from 'react'
import { Card } from '@components/ui/Card'
import { Button } from '@components/ui/Button'
import { Input } from '@components/ui/Input'

type ContentItem = {
  id: string
  title: string
  category: string
  status: 'Draft' | 'Published' | 'Scheduled'
  updated: string
  summary: string
}
import {
  ArrowRight,
  Plus,
  Search,
  Sparkles,
  FileText,
  Bookmark,
  Calendar,
} from 'lucide-react'

const initialContentItems: ContentItem[] = [
  {
    id: 'content-1',
    title: 'How movement habits support recovery',
    category: 'Guides',
    status: 'Published',
    updated: 'Today',
    summary: 'A short guide for daily mobility routines to support recovery and consistency.',
  },
  {
    id: 'content-2',
    title: 'Recovery check-in workflow',
    category: 'Workflows',
    status: 'Draft',
    updated: 'Yesterday',
    summary: 'Design plan and editorial notes for scheduled recovery check-ins.',
  },
  {
    id: 'content-3',
    title: 'Weekly movement newsletter',
    category: 'Announcements',
    status: 'Scheduled',
    updated: '2 days ago',
    summary: 'Scheduled newsletter content for members tracking long-term progress.',
  },
]

const categories = [
  'All',
  'Guides',
  'Workflows',
  'Announcements',
]

const statuses = ['All', 'Draft', 'Published', 'Scheduled']

function ContentPage() {
  const [contentItems, setContentItems] = useState<ContentItem[]>(() => {
    if (typeof window === 'undefined') return initialContentItems
    const stored = window.localStorage.getItem('movewell-content-items')
    return stored ? (JSON.parse(stored) as ContentItem[]) : initialContentItems
  })
  const [query, setQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [newTitle, setNewTitle] = useState('')
  const [newCategory, setNewCategory] = useState('Guides')
  const [newSummary, setNewSummary] = useState('')

  useEffect(() => {
    window.localStorage.setItem(
      'movewell-content-items',
      JSON.stringify(contentItems)
    )
  }, [contentItems])

  const filteredItems = useMemo(() => {
    return contentItems.filter((item: ContentItem) => {
      const matchesQuery =
        query.trim().length === 0 ||
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.summary.toLowerCase().includes(query.toLowerCase())

      const matchesCategory =
        categoryFilter === 'All' ||
        item.category === categoryFilter

      const matchesStatus =
        statusFilter === 'All' ||
        item.status === statusFilter

      return matchesQuery && matchesCategory && matchesStatus
    })
  }, [query, categoryFilter, statusFilter, contentItems])

  const draftCount =
    contentItems.filter((item: ContentItem) => item.status === 'Draft')
      .length

  const publishedCount =
    contentItems.filter((item: ContentItem) => item.status === 'Published')
      .length

  const scheduledCount =
    contentItems.filter((item: ContentItem) => item.status === 'Scheduled')
      .length

  const handleAddContent = () => {
    if (!newTitle.trim() || !newSummary.trim()) return

    setContentItems((prev: ContentItem[]) => [
      {
        id: `content-${Date.now()}`,
        title: newTitle.trim(),
        category: newCategory,
        status: 'Draft',
        updated: 'Just now',
        summary: newSummary.trim(),
      },
      ...prev,
    ])
    setNewTitle('')
    setNewSummary('')
    setCategoryFilter('All')
    setStatusFilter('All')
  }

  const handleToggleStatus = (id: string) => {
    setContentItems((prev: ContentItem[]) =>
      prev.map((item: ContentItem) => {
        if (item.id !== id) return item

        const nextStatus =
          item.status === 'Published'
            ? 'Draft'
            : item.status === 'Draft'
            ? 'Scheduled'
            : 'Published'

        return {
          ...item,
          status: nextStatus,
          updated: 'Just now',
        }
      })
    )
  }

  return (
    <main className="min-h-screen overflow-hidden bg-clay-canvas text-clay-ink">
      <div className="relative z-10 px-4 pt-5 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1280px] space-y-10">
          <section className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-clay-hairline bg-white/90 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-clay-muted">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Content Operations
                </div>
                <div>
                  <h1 className="text-[2.9rem] leading-[0.92] tracking-[-0.06em] text-clay-ink md:text-[4rem]">
                    Content control for digital workflows.
                  </h1>
                  <p className="mt-4 max-w-2xl text-[16px] leading-[1.9] text-clay-body">
                    Plan, publish, and iterate content alongside your recovery insights. Use draft workflows, status controls, and clear editorial summaries to stay aligned with stakeholders.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <Card className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-clay-muted">Drafts</p>
                      <p className="mt-3 text-3xl font-semibold text-clay-ink">{draftCount}</p>
                    </div>
                    <Bookmark className="h-6 w-6 text-clay-primary" aria-hidden="true" />
                  </div>
                </Card>
                <Card className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-clay-muted">Published</p>
                      <p className="mt-3 text-3xl font-semibold text-clay-ink">{publishedCount}</p>
                    </div>
                    <FileText className="h-6 w-6 text-clay-brand-teal" aria-hidden="true" />
                  </div>
                </Card>
                <Card className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-clay-muted">Scheduled</p>
                      <p className="mt-3 text-3xl font-semibold text-clay-ink">{scheduledCount}</p>
                    </div>
                    <Calendar className="h-6 w-6 text-clay-brand-lavender" aria-hidden="true" />
                  </div>
                </Card>
              </div>
            </div>

            <Card className="rounded-[32px] p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-clay-muted">Editorial summary</p>
                  <h2 className="mt-3 text-[1.75rem] font-semibold text-clay-ink">Stay in sync with your content operations.</h2>
                </div>
                <div className="rounded-2xl bg-clay-surface-soft px-4 py-3 text-sm text-clay-ink">Updated just now</div>
              </div>
              <p className="mt-5 text-[15px] leading-[1.8] text-clay-body">
                Publish with confidence, maintain clarity across stakeholders, and use content data to surface priority messaging for your digital workflows.
              </p>
            </Card>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <Card className="space-y-6 p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-clay-muted">Content library</p>
                  <h2 className="mt-3 text-[1.85rem] font-semibold text-clay-ink">Search, filter, and publish stories.</h2>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Input
                      label="Search content"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      leftIcon={<Search size={16} />}
                      placeholder="Keyword, category, or title"
                    />
                    <div className="space-y-2">
                      <label className="block text-[12px] font-medium tracking-[-0.01em] text-clay-muted" htmlFor="status-filter">
                        Status
                      </label>
                      <select
                        id="status-filter"
                        value={statusFilter}
                        onChange={(event) => setStatusFilter(event.target.value)}
                        className="h-14 w-full rounded-2xl border border-clay-hairline bg-clay-surface-soft px-4 text-[15px] text-clay-ink outline-none transition-all duration-200 focus:border-clay-primary/40 focus:ring-4 focus:ring-clay-primary/10"
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
{filteredItems.map((item: ContentItem) => (
                        <Card key={item.id} className="p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-[12px] uppercase tracking-[0.18em] text-clay-muted">{item.category}</p>
                              <h3 className="mt-3 text-xl font-semibold text-clay-ink">{item.title}</h3>
                            </div>
                            <span className="rounded-full bg-clay-surface-soft px-3 py-1 text-[12px] font-semibold text-clay-ink">
                              {item.status}
                            </span>
                          </div>
                          <p className="mt-4 text-[15px] leading-[1.8] text-clay-body">{item.summary}</p>
                          <div className="mt-6 flex items-center justify-between gap-4 text-sm text-clay-muted">
                            <span>{item.updated}</span>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => handleToggleStatus(item.id)}
                            >
                              Toggle status
                            </Button>
                          </div>
                        </Card>
                      ))}

                {filteredItems.length === 0 && (
                  <div className="col-span-full rounded-[32px] border border-dashed border-clay-hairline bg-clay-surface-soft px-8 py-14 text-center">
                    <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-clay-muted">No content found</p>
                    <p className="mt-4 text-[15px] leading-[1.8] text-clay-body">Try broadening your search terms or changing your filters.</p>
                  </div>
                )}
              </div>
            </Card>

            <Card className="space-y-6 p-8">
              <div className="flex items-center gap-3 text-clay-ink">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-clay-brand-teal/10 text-clay-brand-teal">
                  <Plus size={18} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[12px] uppercase tracking-[0.18em] text-clay-muted">Create content</p>
                  <h2 className="text-[1.5rem] font-semibold">Draft a new story</h2>
                </div>
              </div>

              <div className="space-y-4">
                <Input
                  label="Content title"
                  value={newTitle}
                  onChange={(event) => setNewTitle(event.target.value)}
                  placeholder="Enter a headline"
                />

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="category" className="block text-[12px] font-medium tracking-[-0.01em] text-clay-muted">Category</label>
                    <select
                      id="category"
                      value={newCategory}
                      onChange={(event) => setNewCategory(event.target.value)}
                      className="h-14 w-full rounded-2xl border border-clay-hairline bg-clay-surface-soft px-4 text-[15px] text-clay-ink outline-none transition-all duration-200 focus:border-clay-primary/40 focus:ring-4 focus:ring-clay-primary/10"
                    >
                      {categories.filter((value) => value !== 'All').map((value) => (
                        <option key={value} value={value}>{value}</option>
                      ))}
                    </select>
                  </div>

                  <label htmlFor="summary" className="block text-[12px] font-medium tracking-[-0.01em] text-clay-muted">Summary</label>
                  <textarea
                    id="summary"
                    value={newSummary}
                    onChange={(event) => setNewSummary(event.target.value)}
                    rows={5}
                    className="w-full rounded-2xl border border-clay-hairline bg-clay-surface-soft px-4 py-3 text-[15px] text-clay-ink outline-none transition-all duration-200 focus:border-clay-primary/40 focus:ring-4 focus:ring-clay-primary/10"
                    placeholder="Brief preview text for the new content item"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-clay-muted">Drafts are saved locally and can be published later.</div>
                <Button
                  size="lg"
                  onClick={handleAddContent}
                  icon={<ArrowRight size={16} />}
                >
                  Add draft
                </Button>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </main>
  )
}

export default ContentPage
