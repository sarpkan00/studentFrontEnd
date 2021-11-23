import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import StudentService from "../services/studentService";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

function StudentAdd(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let studentService = new StudentService();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
    },
    onSubmit: async (values) => {
      const res = await fetch('http://localhost:8080/student/add',{
          method:"POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });
      if(typeof windows !== undefined){
        window.location.reload();
      }
    },
  });

  return (
    <>
      <Button variant="contained" color="success" onClick={handleOpen}>Ekle</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="firstName"
              name="firstName"
              label="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              label="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default StudentAdd;
