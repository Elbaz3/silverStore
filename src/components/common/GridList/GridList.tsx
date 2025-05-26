import { LottieHandler } from "@components/feedback";
import React from "react";
import { Row, Col } from "react-bootstrap";

type GridListProps<T> = {
  records: T[];
  renderItem: (record: T) => React.ReactNode;
  message?: string;
};

type HasId = {
  id?: number;
};

const GridList = <T extends HasId>({
  records,
  renderItem,
  message,
}: GridListProps<T>) => {
  const renderList =
    records.length > 0 ? (
      records.map((record) => {
        return (
          <Col
            key={record.id}
            xs={6}
            md={3}
            className="d-flex justify-content-center mb-5 mt-2"
          >
            {renderItem(record)}
          </Col>
        );
      })
    ) : (
      <Col>
        <LottieHandler type="empty" message={message} />
      </Col>
    );
  return <Row>{renderList}</Row>;
};

export default GridList;
