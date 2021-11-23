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

function StudentDelete(props) {
  const { id } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let studentService = new StudentService();


  const formik = useFormik({
    initialValues: {
      id: id,
    },
    onSubmit: async (values) => {
      await studentService.delete(values.id);
     if(typeof windows !== undefined){
        window.location.reload();
      }
    },
  });

  return (
    <>
      <Button variant="contained" color="error" onClick={handleOpen}>
        Sil
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Delete
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default StudentDelete;
