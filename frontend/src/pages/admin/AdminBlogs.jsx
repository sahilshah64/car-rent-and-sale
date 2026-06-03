// src/pages/admin/AdminBlogs.jsx
import { useState, useEffect } from 'react'
import api from '../../utils/api'

const EMPTY = { title:'', excerpt:'', content:'', image:'', category:'', author:'' }

export default function AdminBlogs() {
  const [posts,   setPosts]   = useState([])
  const [total,   setTotal]   = useState(0)
  const [loading, setLoading] = useState(true)
  const [modal,   setModal]   = useState(false)
  const [editing, setEditing] = useState(null)
  const [form,    setForm]    = useState(EMPTY)
  const [saving,  setSaving]  = useState(false)
  const [error,   setError]   = useState('')
  const [deleteId,setDeleteId]= useState(null)

  useEffect(() => { fetchPosts() }, [])

  async function fetchPosts() {
    setLoading(true)
    try {
      const { data } = await api.get('/blogs')
      setPosts(data.posts || data)
      setTotal(data.total || (data.posts||data).length)
    } catch { setPosts([]) }
    finally { setLoading(false) }
  }

  function openCreate() { setEditing(null); setForm(EMPTY); setError(''); setModal(true) }
  function openEdit(p)  { setEditing(p); setForm({ ...p }); setError(''); setModal(true) }
  function closeModal() { setModal(false) }
  function update(e)    { setForm(p => ({ ...p, [e.target.name]: e.target.value })) }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true); setError('')
    try {
      if (editing) await api.put(`/blogs/${editing._id}`, form)
      else         await api.post('/blogs', form)
      closeModal(); fetchPosts()
    } catch (err) { setError(err.response?.data?.message || 'Save failed') }
    finally { setSaving(false) }
  }

  async function handleDelete(id) {
    try { await api.delete(`/blogs/${id}`); setDeleteId(null); fetchPosts() } catch {}
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Blog Management</h1>
          <p className="text-sm text-gray-400 mt-1">{total} posts</p>
        </div>
        <button onClick={openCreate} className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2">+ New Post</button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16"><div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"/></div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg font-semibold mb-2">No blog posts yet</p>
            <button onClick={openCreate} className="bg-red-600 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-red-700 transition-colors">Create First Post</button>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {posts.map(post => (
              <div key={post._id} className="flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors">
                <img src={post.image||'https://placehold.co/64x48?text=Blog'} alt="" className="w-16 h-12 object-cover rounded-xl flex-shrink-0"/>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    {post.category && <span className="text-xs bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-full">{post.category}</span>}
                    <span className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 truncate">{post.title}</h3>
                  <p className="text-xs text-gray-400 truncate">{post.excerpt || post.content?.substring(0,80)}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => openEdit(post)} className="p-2 rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors" title="Edit">✏️</button>
                  <button onClick={() => setDeleteId(post._id)} className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors" title="Delete">🗑️</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white">
              <h2 className="text-lg font-black text-gray-900">{editing ? 'Edit Post' : 'New Blog Post'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-700 text-xl">✕</button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {[['title','Title'],['author','Author'],['category','Category (e.g. News, Tips)'],['image','Cover Image URL'],['excerpt','Short Excerpt']].map(([name,label]) => (
                <div key={name}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
                  <input name={name} value={form[name]} onChange={update} required={['title'].includes(name)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" placeholder={label}/>
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Content</label>
                <textarea name="content" value={form.content} onChange={update} required rows={8}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 resize-none" placeholder="Write your blog post content here..."/>
              </div>
              {error && <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">{error}</p>}
              <div className="flex gap-3">
                <button type="button" onClick={closeModal} className="flex-1 border-2 border-gray-200 text-gray-600 font-bold py-3 rounded-xl hover:border-gray-300">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl">
                  {saving ? 'Saving...' : editing ? 'Save Changes' : 'Publish Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
            <div className="text-4xl mb-4">🗑️</div>
            <h3 className="text-lg font-black mb-2">Delete this post?</h3>
            <p className="text-sm text-gray-500 mb-6">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 border-2 border-gray-200 text-gray-600 font-bold py-3 rounded-xl">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
