export default function ({ store, req, redirect }) {
  const cookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('devJobs='))
  if (cookie) return redirect('/')
}
