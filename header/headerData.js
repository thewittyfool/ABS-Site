import React from "react"
import PropTypes from "prop-types"

export const headerListOptions = [
  {
    name: "Features",
    innerMenus: [
      { menu: "Calendar", url:'/calendar' },
      { menu: "Attendance", url:'/attendance' },
      { menu: "Chats", url:'/chats' },
      { menu: "Calls", url:'/calls' },
      { menu: "Tasks", url:'/task' },
      { menu: "Approvals", url:'/approvals' },
    ],
  },
  { name: "About", url:'/aboutus' },
  // { name: "Pricing" },
  { name: "Why MyOrg?", url:'/whymyorg' },
  { name: "Contact Us", url:'/contactus'},
  { name: "Get a demo", type: "button"}
]

export const Expander = props => (
  <span
    role="none"
    onClick={props.onCollapsedInnerMenuClick}
    style={{ position: "absolute", right: "-10px" }}
  >
    <img
      src={
        !props.showCollapsedInnerMenu
          ? require("../../images/plus.png")
          : require("../../images/minus.png")
      }
      alt="open/close"
      className={props.headerStyles.collapsed__inner_menu_expander}
    />
  </span>
)

Expander.propTypes = {
  onCollapsedInnerMenuClick: PropTypes.func,
  headerStyles: PropTypes.object,
  showCollapsedInnerMenu: PropTypes.bool,
}