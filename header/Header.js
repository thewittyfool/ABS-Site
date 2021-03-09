import React, { useEffect, useState, useRef } from "react"
// import { useStaticQuery, graphql } from "gatsby"
// import Img from "gatsby-image"
import PropTypes from "prop-types"

import { headerListOptions, Expander } from "./headerData"

import commonStyles from "../../styles/common.module.css"
import headerStyles from "./_header.module.css"
import { Link } from "gatsby"
import HeaderCollaspsedInnerMenu from "./HeaderCollaspsedInnerMenu"

const Header = ({ currentActive, onLink }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showDropdown, setShowDropdown] = useState(true)
  const [showCollapsedInnerMenu, setShowCollapsedInnerMenu] = useState(false)
  const collaspsedMenuRef = useRef()
  const collapsedMenuListRef = useRef()

  // const imageData = useStaticQuery(graphql`
  //   query {
  //     logoImage: file(relativePath: { eq: ".png" }) {
  //       childImageSharp {
  //         fixed(pngQuality: 10, width: 160) {
  //           ...GatsbyImageSharpFixed
  //         }
  //       }
  //     }
  //   }
  // `)

  const onGetDemo = () => {
    window.location = "http://mobionix.hubspotpagebuilder.com/get-started";
  }

  useEffect(() => {
    window.addEventListener("scroll", onScrolled)

    console.log("headers", headerListOptions)

    return () => window.removeEventListener("scroll", onScrolled)
  }, [])

  const onScrolled = () => {
    if (window.pageYOffset === 0) {
      setIsScrolled(false)
    } else {
      setIsScrolled(true)
    }
  }

  const onCollapsedInnerMenuClick = () =>
    setShowCollapsedInnerMenu(!showCollapsedInnerMenu)

  const onDropdownClick = () => {
    setShowDropdown(!showDropdown)
    if (showDropdown) {
      let collapsedlinklistHeight =
        collapsedMenuListRef.current.children[0].clientHeight
    //   collaspsedMenuRef.current.style.height = `${
    //     headerListOptions.length * collapsedlinklistHeight
    //   }px`
    // } else {
    //   collaspsedMenuRef.current.style.height = `0`
    }
  }

  return (
    <header
      className={[
        [headerStyles.sticky_header, headerStyles.btnScroll].join(" "),
        headerStyles.sticky_menu
      ].join(" ")}
    >
      <div className={[commonStyles.container, headerStyles.wrapper].join(" ")}>
        {/* <div className={headerStyles.logo}> */}
        <a href="/">
        {/* <img
          src={require("../../images/mymate_logo_white.png")}
          alt="light-logo"
          className={headerStyles.logo_light}
        /> */}
        
        
        <img
          src={require("../../images/mymate_logo.png")}
          alt="logo"
          className={headerStyles.logo}
        />
        </a>
        {/* </div> */}
        <div style={{ justifySelf: "right", position: "relative" }}>
          <div className={headerStyles.linklists}>
            <ul className={headerStyles.headerMenus}>
              {headerListOptions.map((headerListOption, index) => (
                headerListOption.type !== "button" ?
                <li
                  className={[
                    headerStyles.linklist,
                    index === currentActive
                      ? headerStyles.linklist_active
                      : null,

                  ].join(" ")}
                  key={index}
                >
                  {" "}
                  {/* HeaderListOptions are loaded from "headerData.js" */}
                  <button onClick={() => onLink(headerListOption.name, index)}>
                    <a target={"_blank"} href={headerListOption.url}>{headerListOption.name}</a>
                  </button>

                  {headerListOption.innerMenus ? (
                    <ul className={headerStyles.header_innermenu}>
                      {headerListOption.innerMenus.map((innerMenu, index) => (
                        <li key={index}>
                          <a target="_blank" href={innerMenu.url}>{innerMenu.menu}</a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li> :
                <li className={headerStyles.btn}><button className={headerStyles.headerButton} ><a href="http://mobionix.hubspotpagebuilder.com/get-started" target="_blank">{headerListOption.name}</a></button></li>
              ))}
            </ul>
          </div>
          <div className={headerStyles.collapsedlinklist}>
            <button
              className={[
                headerStyles.collapsedlinklist_btn,
                !showDropdown
                  ? headerStyles.collapsedlinklist_btn_expand
                  : null,
              ].join(" ")}
              onClick={onDropdownClick}
            >
              <span />
              <span />
              <span />
            </button>
            <nav
              className={[headerStyles.collapsedlinklist_dropdown, !showDropdown? headerStyles.collapsed__header_menu_expand:null].join(" ")}
              ref={collaspsedMenuRef}
            >
              <ul ref={collapsedMenuListRef}>
                {headerListOptions.map((headerListOption, index) => (
                  headerListOption.type !== "button" ?
                  <li className={""} key={index}>
                    {" "}
                    <button
                      style={{display:'flex', position:'relative', width:'100%'}}
                      onClick={() => onLink(headerListOption.name, index)}
                    >
                      {headerListOption.name}
                      {headerListOption.innerMenus ? (
                      <Expander
                        headerStyles={headerStyles}
                        onCollapsedInnerMenuClick={onCollapsedInnerMenuClick}
                        showCollapsedInnerMenu={showCollapsedInnerMenu}
                      />
                    ) : null}
                    </button>

                    {headerListOption.innerMenus ? (
                    <HeaderCollaspsedInnerMenu
                      headerStyles={headerStyles}
                      showCollapsedInnerMenu={showCollapsedInnerMenu}
                      headerMenuOption={headerListOption}
                    />
                  ) : null}
                  </li> :
                  <li className={headerStyles.collapse}><a href="" className={headerStyles.headerButton1}>{headerListOption.name}</a></li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  currentActive: PropTypes.number,
  onLink: PropTypes.func,
}
export default Header
