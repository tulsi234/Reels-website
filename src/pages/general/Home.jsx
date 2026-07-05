import React from 'react'
import ReelFeed from '../../components/ReelFeed'
import '../../styles/reels.css'

const reelItems = [
  {
    _id: '1',
    video: 'https://pixabay.com/videos/download/video-167592_large.mp4',
    poster: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
    description: 'A creamy cheesecake reel with fresh fruit and pastry details that look irresistible.',
    foodPartner: 'sunset-burgers',
    likeCount: 128,
    saves: 24,
    commentsCount: 9,
  },
  {
    _id: '2',
    video: 'https://pixabay.com/videos/download/video-224296_large.mp4',
    poster: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
    description: 'A cool, refreshing frozen treat reel with icy visuals and a crisp finish.',
    foodPartner: 'morning-bloom',
    likeCount: 94,
    saves: 18,
    commentsCount: 6,
  },
  {
    _id: '3',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    poster: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
    description: 'Golden fries and a sizzling burger stack served with bold flavors and a crunchy finish.',
    foodPartner: 'crisp-house',
    likeCount: 176,
    saves: 31,
    commentsCount: 12,
  },
  {
    _id: '4',
    video: 'https://www.w3schools.com/html/movie.mp4',
    poster: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=900&q=80',
    description: 'Colorful bowls packed with fresh greens, crisp toppings, and a bright lunch vibe.',
    foodPartner: 'fresh-bowl',
    likeCount: 144,
    saves: 26,
    commentsCount: 11,
  },
  {
    _id: '5',
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    poster: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=80',
    description: 'A vibrant dessert spread that feels as inviting as a weekend celebration.',
    foodPartner: 'velvet-bites',
    likeCount: 215,
    saves: 42,
    commentsCount: 18,
  },
  {
    _id: '6',
    video: 'https://pixabay.com/videos/download/video-197327_large.mp4',
    poster: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=900&q=80',
    description: 'Comfort food classics served with a modern twist and extra flair for late-night cravings.',
    foodPartner: 'ember-kitchen',
    likeCount: 153,
    saves: 29,
    commentsCount: 10,
  },
  {
    _id: '7',
    video: 'https://pixabay.com/videos/download/video-129576_large.mp4',
    poster: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=900&q=80',
    description: 'Warm pastries and rich coffee create the perfect feel-good morning ritual.',
    foodPartner: 'copper-cafe',
    likeCount: 103,
    saves: 19,
    commentsCount: 7,
  },
  {
    _id: '8',
    video: 'https://pixabay.com/videos/download/video-204620_large.mp4',
    poster: 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&w=900&q=80',
    description: 'A polished spread of fresh food, bright colors, and lively flavor in every bite.',
    foodPartner: 'studio-table',
    likeCount: 188,
    saves: 35,
    commentsCount: 13,
  },
]

const Home = () => {
  return (
    <main className="home-page">
      <ReelFeed items={reelItems} emptyMessage="No reels available yet." />
    </main>
  )
}

export default Home
