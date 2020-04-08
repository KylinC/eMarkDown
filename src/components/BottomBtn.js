import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'

const ButtonBtn = ({text,colorClass,icon,onBtnClick}) => {
    return (
        <button
        type="button"
        className={`btn btn-block no-border ${colorClass}`}
        onClick={onBtnClick}
        >
            <FontAwesomeIcon className="mr-2" size="lg" icon={icon} />
            {text}
        </button>
    )
}

ButtonBtn.propTypes = {
    text: PropTypes.string,
    colorClass: PropTypes.string,
    icon: PropTypes.element.isRequired,
    onBtnClick: PropTypes.func,
}
ButtonBtn.defaultProps = {
    title: "New File"
}
export default ButtonBtn