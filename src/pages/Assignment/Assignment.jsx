import SingleAssignmentGrid from "../../components/SingleAssignmentGrid/SingleAssignmentGrid"
import { Box } from "@mui/material"

export default function Assignment () {
  return (
    <>
    <Box
      sx={{
        width: '100%',
        height: '100vh', // This will make sure the background covers the full view height
        backgroundImage: 'url(https://images.pexels.com/photos/5324991/pexels-photo-5324991.jpeg)', // Direct image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
            flexDirection: 'column',
      }}
    >
<SingleAssignmentGrid />
</Box>
</>
  )
}