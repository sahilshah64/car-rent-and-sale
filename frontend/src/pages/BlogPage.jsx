// src/pages/BlogPage.jsx
import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import api from '../utils/api'

// ── Blog List Page ────────────────────────────────────────────────────
export function BlogListPage() {
  const [posts,   setPosts]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/blogs')
      .then(r => setPosts(r.data.posts || r.data))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="pt-16 min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gray-900 py-16 text-center">
        <h1 className="text-4xl font-black text-white uppercase">ZoomCar Blog</h1>
        <p className="text-gray-400 mt-2 text-sm">News, tips and guides about cars</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_,i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"/>
                <div className="p-5 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"/>
                  <div className="h-3 bg-gray-200 rounded w-full"/>
                  <div className="h-3 bg-gray-200 rounded w-2/3"/>
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-semibold">No blog posts yet</p>
            <p className="text-sm mt-1">Check back soon or add posts via the Admin Panel</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
              <Link to={`/blog/${post._id}`} key={post._id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <img src={post.image || 'https://placehold.co/400x200?text=Blog'} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                  {post.category && (
                    <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">{post.category}</span>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs text-gray-400 mb-2">{new Date(post.createdAt).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</p>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">{post.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-3">{post.excerpt || post.content?.substring(0,120)+'...'}</p>
                  <span className="inline-block mt-4 text-sm font-semibold text-red-600 hover:underline">Read more →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

// ── Blog Detail Page ──────────────────────────────────────────────────
export function BlogDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/blogs/${id}`)
      .then(r => setPost(r.data))
      .catch(() => navigate('/blog'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-16"><div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"/></div>
  if (!post)   return null

  return (
    <main className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <button onClick={() => navigate('/blog')} className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 mb-6 transition-colors">← Back to Blog</button>

        {post.image && <img src={post.image} alt={post.title} className="w-full h-72 object-cover rounded-2xl mb-8 shadow-lg"/>}

        <div className="flex items-center gap-3 mb-4">
          {post.category && <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">{post.category}</span>}
          <span className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</span>
        </div>

        <h1 className="text-3xl font-black text-gray-900 mb-4">{post.title}</h1>
        {post.author && <p className="text-sm text-gray-500 mb-6">By <span className="font-semibold">{post.author}</span></p>}

        <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
          {post.content}
        </div>
      </div>
    </main>
  )
}
