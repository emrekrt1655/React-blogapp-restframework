import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useParams } from "react-router-dom";

import { title, content } from "../../utils/validations";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import LocalMallIcon from "@material-ui/icons/LocalMall";

import { postData } from "../../services/postData";
import axios from "axios";
const validationSchema = yup.object({
  title,
  content,
});

const useStyles = makeStyles((theme) => ({
    root: {
      height: "100vh",
    },
    image: {
      backgroundImage: "url(https://picsum.photos/640/480)",
      backgroundRepeat: "no-repeat",
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[50]
          : theme.palette.grey[900],
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    linkWrapper: {
      textAlign: "center",
      margin: theme.spacing(1.5),
    },
  }));

  export const CustomPostPage = () => {
    const classes = useStyles();
    let { slug } = useParams();
    const [postDetail, setPostDetail] = useState([]);
  
    const getPostDetail = async (
      url = `https://restframework-blogapi.herokuapp.com/api/detail/${slug}`
    ) => {
      try {
        const result = await axios.get(url, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Token " + localStorage.getItem("token"),
          },
        });
        setPostDetail(result?.data);
      } catch ({ response }) {
        if (response) {
          console.log(response?.data?.detail);
        } else {
          console.log("Something went wrong!");
        }
      }
    };
  
    useEffect(() => {
      if (slug) getPostDetail();
    }, [slug]);

    const formik = useFormik({
        initialValues: {
          title: "",
          content: "",
          excerpt:"",
          image: "",
          author: "",
        },
        validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const result = (await slug)
          ? axios.put(
              `https://restframework-blogapi.herokuapp.com/api/update/${slug}/`,
              values,
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: "Token " + localStorage.getItem("token"),
                },
              }
            )
          : postData(
              `https://restframework-blogapi.herokuapp.com/api/create/`,
              values
            );
        console.log(result?.data);
      } catch ({ response }) {
        if (response) {
          console.log(response.data.non_field_errors[0]);
        } else {
          console.log("Something went wrong!");
        }
      }
    },
  });

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LocalMallIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Blog
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              id="title"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              fullWidth
              margin="normal"
              id="content"
              name="content"
              label="Content"
              value={formik.values.content}
              onChange={formik.handleChange}
              error={formik.touched.content && Boolean(formik.errors.content)}
              helperText={formik.touched.content && formik.errors.content}
            />
            <TextField
              fullWidth
              margin="normal"
              id="excerpt"
              name="excerpt"
              label="Excerpt"
              value={formik.values.excerpt}
              onChange={formik.handleChange}
              error={formik.touched.excerpt && Boolean(formik.errors.excerpt)}
              helperText={formik.touched.excerpt && formik.errors.excerpt}
            />
            <TextField
              fullWidth
              margin="normal"
              id="image"
              name="image"
              label="Image URL"
              value={formik.values.image}
              onChange={formik.handleChange}
              error={formik.touched.image && Boolean(formik.errors.image)}
              helperText={formik.touched.image && formik.errors.image}
            />
            <TextField
              fullWidth
              margin="normal"
              id="author"
              name="author"
              label="Author"
              value={formik.values.author}
              onChange={formik.handleChange}
              error={formik.touched.author && Boolean(formik.errors.author)}
              helperText={formik.touched.author && formik.errors.author}
            />

            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );

}