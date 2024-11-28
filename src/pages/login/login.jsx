import { useForm, Controller } from "react-hook-form";
import { Box, Button, TextField, Typography } from "@mui/material";
import bgimge from "../../assets/images/chateimage.png";
import { Link, useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { userschema } from "../../Utilies/formSchema/formSchema";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Slices/userslice/userSlice";
import { toast } from "sonner";
import MiniLoader from "../../loader/miniLoader/miniLoader";
import { setDataToLocalStorage } from "../../Utilies/LocalStorge";
const Login = () => {
  const login=userschema.pick(["email","password"])
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(login),
    mode: "onChange",
    defaultValues: {
      email: "",
      password:""
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.user.isLoading);
  // handel register function
  const handelRegister = (data) => {
    try{
      dispatch(loginUser(data)).unwrap()
      .then((data)=>{
        toast.success(data.message)
        if(data.statusCode===200){
          setDataToLocalStorage("authToken",data.data.token)
          navigate("/dashboard")
        }
      })
      .catch((error)=>{
        toast.error(error)
        console.log("error- then catch-->",error)
      })
    }catch(error){
      console.log("erridsf",error)
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh ",
      }}
      style={{
        backgroundImage: "url('src/assets/images/mountain.png')",

        backgroundPosition: "bottom", // Controls the position of the background
        backgroundRepeat: "no-repeat", // Ensures the image doesn't repeat
        backgroundSize: "cover", // Makes the background cover the container
      }}
    >
      <Box
        sx={{
          display: "flex",

          justifyContent: "center",
          alignItems: "center",
          p: "40px 0",
          height: 580,
          width: "67%",
          borderRadius: 1,
          backdropFilter: "blur(4px) saturate(200%)",
          WebkitBackdropFilter: "blur(4px) saturate(200%)", // Safari compatibility
          backgroundColor: "rgba(255, 255, 255, 0.24)",
          border: "1px solid rgba(209, 213, 219, 0.3)",
        }}
        className="flex flex-row-reverse"
      >
        {/* background image of the registerrationpage */}
        <Box sx={{ width: "50%" }}>
          <img src={bgimge} className="w-[100%] h-[100%] bg-cover" alt="" />
        </Box>

        {/* ------------------------------ */}
        {/* registerration form */}
        <Box
          className=" h-[550px]  p-5 pl-[30px] ml-4"
          sx={{
            width: "50%",
            backdropFilter: "blur(25px) saturate(200%)",
            WebkitBackdropFilter: "blur(25px) saturate(200%)", // Safari compatibility
            backgroundColor: "rgba(255, 255, 255, 0.83)",
            borderRadius: "12px",
            border: "1px solid rgba(209, 213, 219, 0.3)",
          }}
        >
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: "30px",
              color: "#FF4F5A",
              textAlign: "center",
              marginBottom: "5px",
            }}
          >
            Admin Portal Login
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              // color: "rgba(255, 255, 255, 0.8)",
              color: "black",
              textAlign: "center",
              mb: 3, // Adds spacing below the description
            }}
          >
            Don't have an account yet?{" "}
            <Link
              to="/register"
              style={{
                textDecoration: "underline",
                color: "#1976d2", // Material-UI primary blue for consistency
                fontWeight: "500",
              }}
            >
              Sign up here
            </Link>
            to get started.
          </Typography>
          <Box className="p-2 w-[100%] ">
            <form
              className="flex flex-col h-[250px] justify-around  "
              onSubmit={handleSubmit(handelRegister)}
            >
             
              {/* email input */}
              <Box>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      sx={{
                        width: "100%",
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused input": {
                            // color: "#FF4F5A",
                            color: "black", // Text color when focused
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#FF4F5A", // Label color when focused
                        },
                      }}
                      {...field}
                    />
                  )}
                />
              </Box>
              {/* ---- */}

              {/* password */}
              <Box>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="outlined-basic"
                      label="Password"
                      variant="outlined"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      sx={{
                        width: "100%",
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused input": {
                            // color: "#FF4F5A",
                            color: "black", // Text color when focused
                          },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#FF4F5A", // Label color when focused
                        },
                      }}
                      {...field}
                    />
                  )}
                />
              </Box>
              {/* ---- */}
              <Button
                type="submit"
                variant={"contained"}
                disabled={isLoading}
                sx={{
                  textTransform: "none",
                  height: "50px",
                  backgroundColor: isLoading ? "white" : "#FF4F5A",
                  // backgroundColor:"white",
                  fontSize: "22px",
                  fontWeight: "400",
                }}
              >
               {isLoading?<MiniLoader/>:"Log in "}
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Login;
