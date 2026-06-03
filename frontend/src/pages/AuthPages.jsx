// src/pages/AuthPages.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function AuthLayout({ title, subtitle, children }) {
  return (
    <main className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 font-black text-2xl text-gray-900 mb-4">
            <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center"><span className="text-white font-black">Z</span></div>
            ZOOMCAR
          </Link>
          <h1 className="text-2xl font-black text-gray-900">{title}</h1>
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {children}
        </div>
      </div>
    </main>
  )
}

export function LoginPage() {
  const { login } = useAuth()
  const navigate  = useNavigate()
  const [form,    setForm]    = useState({ email: '', password: '' })
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  function update(e) { setForm(p => ({ ...p, [e.target.name]: e.target.value })) }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const user = await login(form.email, form.password)
      navigate(user.role === 'admin' ? '/admin' : '/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Welcome Back" subtitle="Sign in to your ZoomCar account">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email Address</label>
          <input name="email" type="email" value={form.email} onChange={update} required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="you@email.com"/>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Password</label>
          <input name="password" type="password" value={form.password} onChange={update} required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="••••••••"/>
        </div>
        {error && <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">{error}</p>}
        <button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors mt-2">
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        <p className="text-center text-sm text-gray-500">
          No account? <Link to="/register" className="text-red-600 font-semibold hover:underline">Create one</Link>
        </p>
      </form>
    </AuthLayout>
  )
}

export function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form,    setForm]    = useState({ name: '', email: '', password: '', confirm: '' })
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  function update(e) { setForm(p => ({ ...p, [e.target.name]: e.target.value })) }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) return setError('Passwords do not match.')
    if (form.password.length < 6)       return setError('Password must be at least 6 characters.')
    setLoading(true)
    try {
      await register(form.name, form.email, form.password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Create Account" subtitle="Join ZoomCar and find your perfect car">
      <form onSubmit={handleSubmit} className="space-y-4">
        {[['name','Full Name','text','John Doe'],['email','Email Address','email','you@email.com'],['password','Password','password','••••••••'],['confirm','Confirm Password','password','••••••••']].map(([name,label,type,ph]) => (
          <div key={name}>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
            <input name={name} type={type} value={form[name]} onChange={update} required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" placeholder={ph}/>
          </div>
        ))}
        {error && <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">{error}</p>}
        <button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors mt-2">
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
        <p className="text-center text-sm text-gray-500">
          Have an account? <Link to="/login" className="text-red-600 font-semibold hover:underline">Sign in</Link>
        </p>
      </form>
    </AuthLayout>
  )
}
