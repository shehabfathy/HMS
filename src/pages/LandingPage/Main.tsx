import { Box, Button, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { mainImg } from "../../assets";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../service/Endpoint/Endpoint";

export default function Main() {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [capcityData, setCapcityData] = useState(1);
  const navigate = useNavigate();

  return (
    <>
      <Box
        py={8}
        display={"flex"}
        justifyContent={"space-between"}
        gap={8}
        flexDirection={{ xs: "column", md: "row" }}
      >
        {/* Left side text */}
        <Box flex={1}>
          <Typography
            variant="h4"
            color="rgba(21, 44, 91, 1)"
            fontWeight={"bold"}
            gutterBottom
            width={"80%"}
          >
            Forget Busy Work, Start Next Vacation
          </Typography>
          <Typography
            width={"80%"}
            variant="body2"
            color="text.secondary"
            mb={3}
          >
            We provide what you need to enjoy your holiday with family. Time to
            make another memorable moments.
          </Typography>

          <Box>
            <Typography
              variant="subtitle2"
              fontWeight={"bold"}
              mb={1}
              color="rgba(21, 44, 91, 1)"
            >
              Start Booking
            </Typography>
            <Box>
              <Typography variant="body2" mb={1} color="rgba(21, 44, 91, 1)">
                Pick a Date
              </Typography>

              {/* ✅ Replace 2 pickers with one DateRangePicker */}
              <Box mt={1} mb={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Box display={"flex"} gap={2}>
                    <DatePicker
                      label="Start Date"
                      value={startDate}
                      onChange={(newValue) => setStartDate(newValue)}
                      minDate={dayjs()}
                      format="DD MMMM"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          sx: {
                            backgroundColor: "rgba(245, 246, 248, 1)",
                            "& .MuiInputAdornment-root svg": {
                              backgroundColor: "rgba(21, 44, 91, 1)",
                              color: "#fff",
                              padding: "5px",
                            },
                            "& .MuiInputLabel-root": {
                              color: "#000",
                            },
                          },
                        },
                      }}
                    />
                    <DatePicker
                      label="End Date"
                      format="DD MMMM"
                      value={endDate}
                      onChange={(newValue) => setEndDate(newValue)}
                      minDate={startDate || dayjs()}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error:
                            startDate && endDate && endDate.isBefore(startDate),
                          helperText:
                            startDate && endDate && endDate.isBefore(startDate)
                              ? "End date cannot be before start date"
                              : "",
                          sx: {
                            backgroundColor: "rgba(245, 246, 248, 1)", // input background
                            "& .MuiInputAdornment-root svg": {
                              backgroundColor: "rgba(21, 44, 91, 1)",
                              color: "#fff",
                              padding: "5px",
                            },
                            "& .MuiInputLabel-root": {
                              color: "#000",
                            },
                          },
                        },
                      }}
                    />
                  </Box>
                </LocalizationProvider>
              </Box>
            </Box>
            <Box>
              <Typography variant="body2" mb={1} color="rgba(21, 44, 91, 1)">
                Capacity
              </Typography>
              <Box display={"flex"} alignItems={"center"} mb={3}>
                <IconButton
                  onClick={() => {
                    if (capcityData != 11) {
                      setCapcityData(capcityData + 1);
                    }
                  }}
                  sx={{
                    bgcolor: "rgba(26, 188, 156, 1)",
                    color: "#fff",
                    "& :hover": {
                      bgcolor: "rgba(26, 188, 156, 1)",
                    },
                  }}
                >
                  <AddIcon />
                </IconButton>
                <Typography bgcolor={"rgba(245, 246, 248, 1)"} px={10} py={1}>
                  {capcityData} person
                </Typography>
                <IconButton
                  onClick={() => {
                    if (capcityData != 1) {
                      setCapcityData(capcityData - 1);
                    }
                  }}
                  sx={{
                    bgcolor: "rgba(231, 76, 60, 1)",
                    color: "#fff",
                    "& :hover": {
                      bgcolor: "rgba(231, 76, 60, 1)",
                    },
                  }}
                >
                  <HorizontalRuleIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>

          <Button
            variant="contained"
            size="large"
            onClick={() => {
              navigate(ROUTES.EXPLORE, {
                state: {
                  startDate,
                  endDate,
                  capcityData,
                },
              });
            }}
          >
            Explore
          </Button>
        </Box>

        {/* Right side image */}
        <Box
          sx={{
            border: "1px solid rgba(229, 229, 229, 1)",
            position: "relative",
            flex: 1,
            borderRadius: "15px",
          }}
        >
          <img
            src={mainImg}
            alt="vacation"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              top: -25,
              left: -25,
              borderRadius: "15px",
              borderTopLeftRadius: "100px",
            }}
          />
        </Box>
      </Box>
    </>
  );
}
