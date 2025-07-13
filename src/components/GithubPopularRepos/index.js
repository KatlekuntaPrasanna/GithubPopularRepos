import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    activeLanguageId: 'ALL',
    apiStatus: 'INITIAL',
    reposList: [],
  }

  componentDidMount() {
    this.getPopularRepos()
  }

  getPopularRepos = async () => {
    this.setState({apiStatus: 'IN_PROGRESS'})
    const {activeLanguageId} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`,
    )
    if (response.ok) {
      const data = await response.json()
      const updatedRepos = data.popular_repos.map(repo => ({
        id: repo.id,
        name: repo.name,
        issuesCount: repo.issues_count,
        forksCount: repo.forks_count,
        starsCount: repo.stars_count,
        avatarUrl: repo.avatar_url,
      }))
      this.setState({reposList: updatedRepos, apiStatus: 'SUCCESS'})
    } else {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  updatelanguageId = id => {
    this.setState({activeLanguageId: id}, this.getPopularRepos)
  }

  renderLoader = () => (
    <div data-testid="loader" className="popular-repos-app">
      <Loader type="ThreeDots" color="#0284c7" height={50} width={50} />
    </div>
  )

  renderFailure = () => (
    <div className="popular-repos-app">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="not-found-image"
      />
    </div>
  )

  renderPopularRepos = () => {
    const {activeLanguageId, reposList} = this.state
    return (
      <div className="popular-repos-app">
        <h1 className="heading">Popular</h1>
        <ul className="language-container">
          {languageFiltersData.map(lang => (
            <LanguageFilterItem
              key={lang.id}
              isactive={activeLanguageId === lang.id}
              language={lang}
              updatelanguageId={this.updatelanguageId}
            />
          ))}
        </ul>
        <ul className="repos-container">
          {reposList.map(each => (
            <RepositoryItem key={each.id} reposItem={each} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'IN_PROGRESS':
        return this.renderLoader()
      case 'SUCCESS':
        return this.renderPopularRepos()
      case 'FAILURE':
        return this.renderFailure()
      default:
        return null
    }
  }
}

export default GithubPopularRepos
