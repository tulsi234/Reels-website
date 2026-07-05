import React, { useEffect, useMemo, useRef, useState } from 'react'

const INITIAL_BATCH_SIZE = 6
const LOAD_BATCH_SIZE = 4

const ReelFeed = ({ items = [], onLike, onSave, emptyMessage = 'No videos available.' }) => {
  const [activeId, setActiveId] = useState(null)
  const [likedIds, setLikedIds] = useState(() => new Set())
  const [savedIds, setSavedIds] = useState(() => new Set())
  const [commentedIds, setCommentedIds] = useState(() => new Set())
  const [feedback, setFeedback] = useState(null)
  const [visibleItems, setVisibleItems] = useState([])
  const [loadedIds, setLoadedIds] = useState(() => new Set())
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const videoRefs = useRef(new Map())
  const feedRef = useRef(null)
  const loaderRef = useRef(null)

  const normalizedItems = useMemo(() => {
    return items.map((item) => ({
      ...item,
      _id: item._id ?? item.id,
      likes: item.likeCount ?? item.likes ?? 0,
      saves: item.savesCount ?? item.bookmarks ?? item.saves ?? 0,
      comments: item.commentsCount ?? (Array.isArray(item.comments) ? item.comments.length : 0),
    }))
  }, [items])

  useEffect(() => {
    if (!normalizedItems.length) {
      setVisibleItems([])
      setActiveId(null)
      setLoadedIds(new Set())
      return
    }

    setVisibleItems(normalizedItems.slice(0, INITIAL_BATCH_SIZE))
    setActiveId(normalizedItems[0]._id)
    setLoadedIds(new Set())
  }, [normalizedItems])

  useEffect(() => {
    if (!feedback) return

    const timer = window.setTimeout(() => setFeedback(null), 1600)
    return () => window.clearTimeout(timer)
  }, [feedback])

  useEffect(() => {
    if (!normalizedItems.length || !feedRef.current || !loaderRef.current) return

    const feed = feedRef.current
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry?.isIntersecting || isLoadingMore) return

        setIsLoadingMore(true)
        window.setTimeout(() => {
          setVisibleItems((current) => {
            const start = current.length % normalizedItems.length
            const nextBatch = normalizedItems.slice(start, start + LOAD_BATCH_SIZE)
            return current.concat(nextBatch)
          })
          setIsLoadingMore(false)
        }, 220)
      },
      { root: feed, rootMargin: '220px 0px' },
    )

    observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [normalizedItems, isLoadingMore])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target
          if (!(video instanceof HTMLVideoElement)) return

          if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
            video.play().catch(() => {})
            setActiveId(video.dataset.reelId)
          } else {
            video.pause()
          }
        })
      },
      { threshold: [0, 0.25, 0.55, 0.9, 1] },
    )

    videoRefs.current.forEach((video) => observer.observe(video))
    return () => observer.disconnect()
  }, [visibleItems])

  const setVideoRef = (id) => (el) => {
    if (!el) {
      videoRefs.current.delete(id)
      return
    }

    el.dataset.reelId = id
    videoRefs.current.set(id, el)
  }

  const handleLike = (item) => {
    const isCurrentlyLiked = likedIds.has(item._id)

    setLikedIds((current) => {
      const next = new Set(current)
      if (next.has(item._id)) {
        next.delete(item._id)
      } else {
        next.add(item._id)
      }
      return next
    })

    onLike?.(item)
    setFeedback({ message: isCurrentlyLiked ? 'Like removed' : 'Liked' })
  }

  const handleSave = (item) => {
    const isCurrentlySaved = savedIds.has(item._id)

    setSavedIds((current) => {
      const next = new Set(current)
      if (next.has(item._id)) {
        next.delete(item._id)
      } else {
        next.add(item._id)
      }
      return next
    })

    onSave?.(item)
    setFeedback({ message: isCurrentlySaved ? 'Saved removed' : 'Saved' })
  }

  const handleComment = (item) => {
    setCommentedIds((current) => new Set(current).add(item._id))
    setFeedback({ message: 'Comment added' })
  }

  const handleShare = async (item) => {
    const shareText = `Check out ${item.foodPartner || 'this store'} on Moon.`

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Moon Reel',
          text: shareText,
          url: window.location.href,
        })
        setFeedback({ message: 'Shared' })
        return
      }

      await navigator.clipboard.writeText(shareText)
      setFeedback({ message: 'Link copied' })
    } catch {
      setFeedback({ message: 'Share unavailable' })
    }
  }

  if (!normalizedItems.length) {
    return (
      <div className="reels-page">
        <div className="empty-state">
          <p>{emptyMessage}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="reels-page">
      {feedback ? <div className="reel-feedback">{feedback.message}</div> : null}
      <div className="reels-feed" ref={feedRef} role="list">
        {visibleItems.map((item, index) => {
          const isLiked = likedIds.has(item._id)
          const isSaved = savedIds.has(item._id)
          const isCommented = commentedIds.has(item._id)
          const isActive = activeId === item._id
          const isLoaded = loadedIds.has(item._id)

          return (
            <section key={`${item._id}-${index}`} className={`reel ${isActive ? 'reel--active' : ''}`} role="listitem">
              <video
                ref={setVideoRef(item._id)}
                className="reel-video"
                src={item.video}
                muted
                autoPlay
                playsInline
                loop
                preload="auto"
                poster={item.poster}
                onLoadedData={() => setLoadedIds((current) => new Set(current).add(item._id))}
                onMouseEnter={() => setActiveId(item._id)}
                onTouchStart={() => setActiveId(item._id)}
              />

              {!isLoaded ? <div className="reel-loading">Loading video…</div> : null}

              <div className="reel-overlay">
                <div className="reel-overlay-gradient" aria-hidden="true" />
                <div className="reel-topbar">
                  <div className="reel-brand">
                    <span className="reel-brand__mark">Moon</span>
                    <span className="reel-brand__sub">Reels</span>
                  </div>
                  <button className="reel-icon-button reel-icon-button--home" aria-label="Go home">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 10.5 12 3l9 7.5" />
                      <path d="M5 9.5V21h5v-5h4v5h5V9.5" />
                    </svg>
                    <span className="reel-icon-button__label">Home</span>
                  </button>
                </div>

                <div className="reel-bottom-bar">
                  <div className="reel-content">
                    <p className="reel-description" title={item.description}>{item.description}</p>
                    <a className="reel-btn" href={`/food-partner/${item.foodPartner}`} aria-label="Visit store">
                      Visit store
                    </a>
                  </div>

                  <div className="reel-actions">
                    <div className="reel-action-group">
                      <button
                        onClick={() => handleLike(item)}
                        className={`reel-action ${isLiked ? 'reel-action--active' : ''}`}
                        aria-label="Like"
                      >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                        </svg>
                      </button>
                      <div className="reel-action__count">{item.likes + (isLiked ? 1 : 0)}</div>
                    </div>

                    <div className="reel-action-group">
                      <button className={`reel-action ${isCommented ? 'reel-action--active' : ''}`} onClick={() => handleComment(item)} aria-label="Comments">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                        </svg>
                      </button>
                      <div className="reel-action__count">{item.comments + (isCommented ? 1 : 0)}</div>
                    </div>

                    <div className="reel-action-group">
                      <button className="reel-action" onClick={() => handleShare(item)} aria-label="Share">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 5h5v5" />
                          <path d="M19 5 10 14" />
                          <path d="M5 19h14" />
                        </svg>
                      </button>
                    </div>

                    <div className="reel-action-group">
                      <button className={`reel-action ${isSaved ? 'reel-action--active' : ''}`} onClick={() => handleSave(item)} aria-label="Save">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
                        </svg>
                      </button>
                      <div className="reel-action__count">{item.saves + (isSaved ? 1 : 0)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )
        })}
        <div ref={loaderRef} className="reel-loader" aria-hidden="true">
          {isLoadingMore ? 'Loading more reels…' : 'Swipe up for more'}
        </div>
      </div>
    </div>
  )
}

export default ReelFeed
