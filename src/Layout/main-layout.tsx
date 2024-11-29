import { Navigate } from "react-router-dom";
import { loadState } from "../Config/storage";
import React from "react";
import { Button, Flex, Table, Modal } from "antd";
import { useGetData } from "../Service/Query/useGetData";
import { SearchIcon } from "../assets/icons/search-icon";
import { Search } from "../components/Search";
import { CreateForm } from "../components/Form";
// const sharedOnCell = (_: getDataType, index?: number) => {
//   if (index === 1) {
//     return { colSpan: 0 };
//   }

//   return {};
// };

export interface getDataType {
  data: {
    contracts: {
      id: number;
      title: string;
      createdAt: string;
      attachment: {
        origName: string;
        size: number;
        url: string;
      };
      course: {
        createdAt: string;
        id: number;
        name: string;
      };
    }[];
  };
}

interface columType {
  title: string;
  dataIndex: string;
  key: string;
  width?: string;
}

const columns: columType[] = [
  {
    title: "#",
    dataIndex: "key",
    key: "key",
    width: "20px",
  },
  {
    title: "Nomi",
    dataIndex: "name",
    key: "name",
    width: "480px",
  },
  {
    title: "Kurs",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "change",
    dataIndex: "change",
    key: "change",
  },
];
export const MainLayout: React.FC = () => {
  const token = loadState("Token");
  const { data } = useGetData();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const item = data?.data.contracts.map((item, index) => {
    console.log(item.course.name);

    return {
      key: index + 1,
      title: item.title,
      // title: item.course.name,
      name: item.attachment.origName,
      // name: item.attachment.url,
    };
  });
  if (!token) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        style={{ backgroundColor: "#fbfbfb", padding: "20px" }}
      >
        <div style={{ position: "relative", width: "1200px" }}>
          <div
            style={{
              position: "absolute",
              top: "7px",
              left: "12px",
              cursor: "pointer",
            }}
          >
            <SearchIcon />
          </div>
          <Search />
        </div>
        <div>
          <Button
            type="primary"
            onClick={() => setIsModalOpen(!isModalOpen)}
            style={{ padding: "10px 20px", height: "45px" }}
          >
            Qo‘shish
          </Button>
        </div>
      </Flex>
      <Table<getDataType | any>
        columns={columns}
        style={{ backgroundColor: "white" }}
        dataSource={item}
        bordered
      />
      <Modal
        width={"480px"}
        title="Shartnoma yaratish"
        style={{ padding: "24px" }}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(!isModalOpen)}
        footer
      >
        <CreateForm onCancel={() => setIsModalOpen(!isModalOpen)} />
      </Modal>
    </>
  );
};
