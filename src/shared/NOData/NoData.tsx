import { Box, Typography } from "@mui/material";
import { NoDataImg } from "../../assets";

export default function NoData() {
  return (
    <>
      <Box textAlign={"center"}>
        <Box component={"img"} src={NoDataImg} alt="NOData-Img" className="" />
        <Typography variant="h5">No Data !</Typography>
        <Typography component={"p"} color="text.secondary">
          There’s nothing to show here right now.
        </Typography>
      </Box>
    </>
  );
}
