import { Backdrop } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../app/store.ts";
import NasdaqSpinner from "./NasdaqSpinner";

const LoadingOverlay = () => {
  const isLoading = useSelector((state: RootState) => state.ui.isLoading);

  return (
    <Backdrop sx={{ color: "#fff", zIndex: 9999 }} open={isLoading}>
      <NasdaqSpinner size={60} />
    </Backdrop>
  );
};

export default LoadingOverlay;
