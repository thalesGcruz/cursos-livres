// import { Head } from '@inertiajs/react'
import Layout from '~/layout/site/layout'

export default function Home(props: any) {
  const handleLogin = async () => {
    await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'thalesgcruz@gmail.com', password: 'asd' }),
    })
  }

  const handleLogout = async () => {
    await fetch('/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const handleAction = async () => {
    await fetch('/certificate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({ code: 'off70' }),
    })
  }

  return (
    <Layout>
      <main className="flex gap-4">
        {props?.user?.full_name || 'nada'}
        <button type="button" className="bg-blue-400 text-white" onClick={handleLogin}>
          Login
        </button>
        {/* <a href="/auth/logout" className="bg-blue-400 text-white" onClick={handleLogout}>Logout</a> */}
        <button type="button" className="bg-blue-400 text-white" onClick={handleLogout}>
          Logout
        </button>
        <button type="button" className="bg-blue-400 text-white" onClick={handleAction}>
          action
        </button>
      </main>
    </Layout>
  )
}
