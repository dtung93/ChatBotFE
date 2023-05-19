import { createTheme } from "@mui/material/styles";

// Tùy chỉnh các giá trị màu sắc, font-size, spacing, ... tại đây
export const theme = createTheme({
    palette: {
        primary: {
            main: "#FFBF17",
        },
        secondary: {
            main: "#DC143C",
            light: "grey"
        },
        background: {
            default: "#232323",
            secondary: "#2b2e33",
        },
        text: {
            primary: '#fff',
            secondary: 'whitesmoke'
        },
        action:{
            disabledBackground:'#FFBF17',
            disabled:'white',
        }
       
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#3c4147',
                      
                      },

                    
                      
                },
            }
        },
        MuiOutlinedInput: {
            root: {
               
              },
          },
    }
});