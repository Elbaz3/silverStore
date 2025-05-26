import useCategories from "@hooks/useCategories";
import { Container } from "react-bootstrap";
import { GridList, Heading } from "@components/common";
import { Category } from "@components/eCommerce";
import { Loading } from "@components/feedback";

const Categories = () => {

  const { loading, error, records } = useCategories()



  return (
    <Container>
      <Heading title="Categories" />
      <Loading loading={loading} error={error} type="category">
        <GridList
        message="no categories found"
          records={records}
          renderItem={(record) => <Category {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Categories;