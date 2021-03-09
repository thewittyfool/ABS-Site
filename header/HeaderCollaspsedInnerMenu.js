import React, { useRef, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const HeaderCollaspsedInnerMenu = ({
  headerStyles,
  showCollapsedInnerMenu,
  headerMenuOption,
}) => {
  const [listSize, setListSize] = useState()
  const innerMenuListRef = useRef()

  useEffect(() => {
    ;(() => {
      setListSize(innerMenuListRef.current.clientHeight) //get the height of single list
    })()
  }, [listSize])

  return (
    <ul
      className={headerStyles.collapsed__inner_menu}
      style={
        showCollapsedInnerMenu
          ? { height: `${listSize * headerMenuOption.innerMenus.length}px` }
          : { height: "0" }
      }
      // calcuate the total height by multipling with total list length
      // to get smooth transition animation
    >
      {headerMenuOption.innerMenus.map((innerMenu, index) => (
        <li key={index} ref={innerMenuListRef}>
          <div>
            {innerMenu.menu}
          </div>
        </li>
      ))}
    </ul>
  )
}

HeaderCollaspsedInnerMenu.propTypes = {
  headerStyles: PropTypes.object,
  showCollapsedInnerMenu: PropTypes.bool,
  headerMenuOption: PropTypes.object,
}

export default HeaderCollaspsedInnerMenu