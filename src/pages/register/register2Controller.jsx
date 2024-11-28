import { useForm, Controller, set } from "react-hook-form";
import { Box, Button, TextField, Typography } from "@mui/material";
import bgimge from "../../assets/images/chateimage.png";
import { Link,useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { userschema } from "../../Utilies/formSchema/formSchema";
import { createUser, loginUser } from "../../Slices/userslice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import MiniLoader from "../../loader/miniLoader/miniLoader";
import { setDataToLocalStorage } from "../../Utilies/LocalStorge";
const RegistterController = () => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userschema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const dispatch=useDispatch()
  const  navigate=useNavigate()
  const isLoading=useSelector((state)=>state.user.isLoading)
  // handel register function
  let user={}
  const handelRegister = (data) => {
    const{email,password}=data
    user={email,password}
    try{
        dispatch(createUser(data)).unwrap()
        .then((data)=>{
            toast.success(data.message)
            console.log(data,"registerstion data")
            // setDataToLocalStorage("auth")
           if(data.statusCode===200){
           try{
            dispatch(loginUser(user)).unwrap()
            .then((data)=>{
              setDataToLocalStorage("authToken",data.data.token)
              navigate("/dashboard")
            })
            .catch((error)=>{
              console.log(error,"error in go to dasbord througn the register")
              navigate("/login")
            })
           }catch(error){
            console.log(error,"try catchin register lin e52")
           }
          }
          reset();
        })
        .catch((error)=>{
          if(error==="You Are Already Registered"){
            navigate("/login")
            toast.info(error)
            }else{
                toast.error(error)
            }
            reset();
        })

    }catch(error){
       toast.error(error)
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
      >
        {/* background image of the registerrationpage */}
        <Box sx={{ width: "50%" }}>
          <img src={bgimge} className="w-[100%] h-[100%] bg-cover" alt="" />
        </Box>

        {/* ------------------------------ */}
        {/* registerration form */}
        <Box
          className=" h-[550px]  p-5 pl-[30px] mr-4"
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
            Create Your Account
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
            Please fill in the form below to get started. Already have an
            account?{" "}
            <Link
              to="/login"
              style={{
                textDecoration: "underline",
                color: "blue",
                fontWeight: "500",
              }}
            >
              Log in here.
            </Link>
          </Typography>
          <Box className="p-2 w-[100%] ">
            <form
              className="flex flex-col h-[350px] justify-between  "
              onSubmit={handleSubmit(handelRegister)}
            >
              {/* name */}
              <Box>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="outlined-basic"
                      label="Name"
                      variant="outlined"
                      error={!!errors.name} // Show error if field has an error
                      helperText={errors.name ? errors.name.message : ""}
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

              {/* confirm password */}
              <Box>
                <Controller
                  name="confirm_password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="outlined-basic"
                      label=" Confirm Password"
                      variant="outlined"
                      error={!!errors.confirm_password}
                      helperText={errors.confirm_password?.message}
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
                // disabled={true}
                sx={{
                  textTransform: "none",
                  height: "50px",
                  backgroundColor: isLoading?"white":"#FF4F5A",
                // backgroundColor:"white",
                  fontSize: "22px",
                  fontWeight: "400",
                }}
              >
                {isLoading?<MiniLoader/>:"Singn up"}
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default RegistterController;
