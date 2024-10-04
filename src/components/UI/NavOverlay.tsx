import { Overlay } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { closeNav } from "../../slices/navBarSlice";

const NavOverlay: React.FC = () => {
  const matches = useMediaQuery("(min-width: 768px)");
  const dispatch = useAppDispatch();
  const isNavClosed = useAppSelector((state) => state.navBar.isNavClosed);

  if (matches || isNavClosed) return null;

  const handleOverlayClick = () => {
    dispatch(closeNav());
  };

  return (
    <Overlay
      onClick={handleOverlayClick}
      color='var(--background-color-primary)'
      opacity={0.9}
      zIndex={99}
    />
  );
};

export default NavOverlay;
