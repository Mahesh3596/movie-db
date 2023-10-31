import { Popper } from "@mui/base";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './NavMenu.css'

const NavMenu = ({anchorEl=null, menuObj={}, onMenuClose=()=>{}}) => {
    const navigate = useNavigate()
    const onMenuClick = (menu) => {
        if (menu?.path) navigate(menu.path)
        onMenuClose()
    }
    return (
        anchorEl && menuObj?.id && <Popper className="menu-popper"
            id={menuObj.id}
            open={menuObj.open}
            anchorEl={anchorEl}
            onClose={onMenuClose}
            placement="bottom-start"
        >
            {menuObj.menus.map(menu => 
                <Typography key={menu.title} onClick={() => onMenuClick(menu)} className="menu-popper-item"
                    fontWeight='bold' variant='caption' display='block'
                >
                    {menu.title}
                </Typography>)}
        </Popper>
    )
}

export default NavMenu;