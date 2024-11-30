import { Navigate } from "react-router-dom";
import { loadState } from "../Config/storage";
import React from "react";
import { Button, Flex, Table, Modal, Dropdown, Form } from "antd";
import { useGetData } from "../Service/Query/useGetData";
import { SearchIcon } from "../assets/icons/search-icon";
import { Search } from "../components/Search";
// import { CreateForm } from "../components/Form";
// import { ReusableForm } from "../components/ReUsable-Form/reusable-form";
import { CreateForm } from "../components/Form";
import { EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Contract } from "../components/DataTypes/data-types";
// import { Contract } from "../components/DataTypes/data-types";
// import { EditOutlined, MoreOutlined } from "@ant-design/icons";
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
  render?: any;
}

export const MainLayout: React.FC = () => {
  const token = loadState("Token");
  // const [editingId, setEditingId] = React.useState<number | null>(null);
  const [form] = Form.useForm();
  const { data } = useGetData();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const item = data?.data.contracts.map((item, index) => {
    return {
      key: index + 1,
      title: item.title,
      name: item.attachment ? item.attachment.origName : "",
    };
  });
  const Edit = (record: Contract) => {
    setIsModalOpen(!isModalOpen);
    // setEditingId(record.id);
    form.setFieldsValue({
      title: record.title,
      courseId: 0,
    });
  };
  const menuItems = [
    {
      key: "edit",
      label: "Tahrirlash",
      icon: <EditOutlined />,
      onClick: Edit,
    },
  ];

  const columns: columType[] = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      width: "80px",
    },
    {
      title: "Nomi",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Kurs",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_: any, record: Contract) => (
        <Dropdown
          menu={{
            items: menuItems.map((item) => ({
              ...item,
              onClick: () => Edit(record),
            })),
          }}
          trigger={["click"]}
        >
          <Button
            style={{
              border: "none",
              backgroundColor: "transparent",
              boxShadow: "none",
            }}
            icon={<MoreOutlined />}
          />
        </Dropdown>
      ),
    },
  ];
  if (!token) {
    return <Navigate to={"/"} />;
  }
  const onCancel = (): void => {
    setIsModalOpen(!isModalOpen); // Toggle the modal state
  };

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
        <CreateForm onCancel={onCancel} />
      </Modal>
    </>
  );
};
