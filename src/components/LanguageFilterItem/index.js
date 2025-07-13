import './index.css'

const LanguageFilterItem = props => {
  const {language, isactive, updatelanguageId} = props

  const buttonClass = isactive ? 'active-button' : 'inactive-button'

  const updatelanguage = () => {
    updatelanguageId(language.id)
  }

  return (
    <li>
      <button
        type="button"
        className={`lang-button ${buttonClass}`}
        onClick={updatelanguage}
      >
        {language.language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
