import React, { useState } from 'react'
import s from './Dropdown.module.css'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';


export const Dropdown = ({ trigger, menu }) => {
  const [open, setOpen] = React.useState(false);

  const [value, setValue] = useState(trigger)
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={s.dropdown}>
      <div className={s.menuItem} onClick={handleOpen}>
        {/* //if you what to input in props not text, but element  */}
        {/* {React.cloneElement(trigger)} */}
        {/* //if you want to change the menu title on click */}
        <div>{value}</div>
        <KeyboardArrowDownOutlinedIcon className={`${s.arrow} ${open ? s.arrowDown : ''}`} />
      </div>
      {open ? (
        <ul className={s.menu}>
          {menu.map((menuItem, index) => (
            <li key={index} className={s.menuItem}>
              {/* //if you what to input in props not text, but element  */}
              {/* {React.cloneElement(menuItem, {
                onClick: () => {
                  //in props to item can be added some function
                  menuItem.props.onClick();
                  setValue(renderToString(menuItem))
                  
                  setOpen(false);
                },
              })} */}

              {/* //if you want to change the menu title on click */}
              <button onClick={() => {
                setValue(menuItem)
                setOpen(false)
              }}>
                {menuItem}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
