import './index.css'

const RepositoryItem = props => {
  const {reposItem} = props
  const {name, avatarUrl, starsCount, forksCount, issuesCount} = reposItem

  return (
    <li className="repo-card">
      <img src={avatarUrl} alt={name} className="repo-avatar" />
      <h1 className="repo-name">{name}</h1>
      <div className="repo-stats">
        <div className="repo">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="image"
          />
          <p className="repo-text">{starsCount} stars</p>
        </div>
        <div className="repo">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="image"
          />
          <p className="repo-text">{forksCount} forks</p>
        </div>
        <div className="repo">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="image"
          />
          <p className="repo-text">{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
