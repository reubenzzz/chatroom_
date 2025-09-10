export default function formatDate(ts) {
if (!ts) return ''
const d = ts.toDate ? ts.toDate() : new Date(ts)
return d.toLocaleString()
}
