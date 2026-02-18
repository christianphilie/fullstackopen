import { Link } from 'react-router-dom'

const BlogListItem = ({ blog }) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
      <div>
        <div className="flex items-center gap-2">
          <Link to={`/blogs/${blog.id}`} className="text-sm font-medium hover:underline">
            {blog.title}
          </Link>
          <span className="text-xs text-slate-500">by {blog.author}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">added by @{blog.user.username}</span> &middot;
          <span className="text-xs text-slate-500">{blog.likes} likes</span> &middot;
          <span className="text-xs text-slate-500">{blog.comments.length} comments</span>
        </div>
      </div>
    </div>
  )
}

export default BlogListItem
