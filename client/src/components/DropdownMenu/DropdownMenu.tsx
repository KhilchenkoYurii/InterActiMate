import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import UserIcon from "../../assets/icons/user_filled.svg";
import { Fade } from "@mui/material";

export default function DropdownMenu({ user }: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <img
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="rounded-full cursor-pointer"
        src={user?.avatar ? user?.avatar : UserIcon}
        width={30}
        height={30}
      />
      <Menu
        className="mt-2"
        sx={{ color: "red" }}
        id="fade-button"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        TransitionComponent={Fade}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>Мої оголошення</MenuItem>
        <MenuItem onClick={handleClose}>Вийти</MenuItem>
      </Menu>
    </div>
  );
}
