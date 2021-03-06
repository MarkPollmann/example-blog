import moment from 'moment'
import MarkdownIt from 'markdown-it'
import truncate from 'html-truncate'
import TagList from 'src/components/Blog/TagList'
import { Link, routes } from '@redwoodjs/router'

const md = new MarkdownIt()

const formattedDate = (date) => {
  return moment(date).fromNow()
}

const formattedBody = (post, summary) => {
  let output = md.render(post.body)
  if (summary) {
    return truncate(output, 500)
  }
  return output
}

const Post = ({ post, summary = false }) => {
  return (
    <article className="mt-4 mb-12">
      {!summary && <img src={post.image} className="mt-1 mb-2 mr-4 w-full" />}
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          <Link
            to={routes.post({ slug: post.slug })}
            className="text-indigo-600 hover:bg-indigo-100 rounded"
          >
            {post.title}
          </Link>
        </h1>
        <h2 className="text-sm text-gray-600">by {post.author}</h2>
      </header>
      <div className="mt-2">
        {summary && (
          <img src={post.image} className="float-left mt-1 mr-4 w-48" />
        )}
        <div
          className="markdown"
          dangerouslySetInnerHTML={{ __html: formattedBody(post, summary) }}
        ></div>
        {summary && (
          <p className="clearfix text-center">
            <Link
              to={routes.post({ slug: post.slug })}
              className="inline-block text-right text-indigo-600 hover:text-indigo-800 text-sm bg-indigo-100 hover:bg-transparent px-2 rounded font-medium hover:bg-indigo-100 rounded"
            >
              Continue reading &raquo;
            </Link>
          </p>
        )}
      </div>
      <footer className="flex items-center mt-4 text-xs text-gray-600">
        <time>Posted: {formattedDate(post.postedAt)}</time>
        {post.tags && (
          <ul className="flex-1 text-right">
            <TagList tags={post.tags} />
          </ul>
        )}
      </footer>
    </article>
  )
}

export default Post
