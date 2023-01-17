import { useFormik } from "formik";
import { FunctionComponent, useEffect } from "react";
import * as yup from "yup";
import { addBook } from "../services/booksService";
import Book from "../interfaces/Book";

interface AddBookProps {
  setBooksChanged: Function;
  booksChanged: boolean;
}

const AddBook: FunctionComponent<AddBookProps> = ({
  setBooksChanged,
  booksChanged,
}) => {
  let formik = useFormik({
    initialValues: { name: "", author: "", genre: "", price: 0 },
    validationSchema: yup.object({
      name: yup.string().required().min(2),
      author: yup.string().required().min(2),
      genre: yup.string().required().min(2),
      price: yup.number().required().min(0),
    }),
    onSubmit: (values: Book, { resetForm }) => {
      addBook(values)
        .then(() => {
          resetForm();
          setBooksChanged(!booksChanged);
          formik.setFieldValue("price", "");
        })
        .catch((err) => console.log(err));
    },
  });

  useEffect(() => {
    formik.setFieldValue("price", "");
  }, []);
  return (
    <>
      <div>
        <h5 className="display-5">ADD BOOK</h5>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Harry Potter"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="name">Book Name</label>
            {formik.touched.name && formik.errors.name && (
              <small className="text-danger">{formik.errors.name}</small>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="author"
              placeholder="JK Rolling"
              name="author"
              value={formik.values.author}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="author">Author</label>
            {formik.touched.author && formik.errors.author && (
              <small className="text-danger">{formik.errors.author}</small>
            )}
          </div>
          <select
            className="form-select mb-3"
            aria-label="Default select example"
            name="genre"
            value={formik.values.genre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option hidden selected>
              Choose Genre
            </option>
            <option value="Novel">Novel</option>
            <option value="Biography">Biography</option>
            <option value="Kids">Kids</option>
          </select>
          <div className="form-floating">
            <input
              type="number"
              className="form-control"
              id="price"
              placeholder="100"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="price">Price</label>
            {formik.touched.price && formik.errors.price && (
              <small className="text-danger">{formik.errors.price}</small>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-warning w-100 my-3"
            disabled={!formik.isValid || !formik.dirty}
          >
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default AddBook;
