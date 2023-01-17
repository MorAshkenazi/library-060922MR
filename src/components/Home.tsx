import { FunctionComponent, useState } from "react";
import BooksTable from "./BooksTable";
import AddBook from "./AddBook";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  let [booksChanged, setBooksChanged] = useState<boolean>(false);
  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-4">
            <AddBook
              setBooksChanged={setBooksChanged}
              booksChanged={booksChanged}
            />
          </div>
          <div className="col-md-8">
            <BooksTable booksChanged={booksChanged} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
