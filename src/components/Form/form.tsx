import { Button, Form, Input, message, Upload } from "antd";
import { useCreateData } from "../../Service/Mutation/useCreateData";
import { useFileCreate } from "../../Service/Mutation/useFileCreate";
import React from "react";
import { useQueryClient } from "@tanstack/react-query";
export const CreateForm = ({ onCancel }: { onCancel: () => void }) => {
  const { mutate: CreateMutate } = useCreateData();
  const client = useQueryClient();
  const { mutate: fileMutate } = useFileCreate();
  interface dataFormData {
    title?: string;
    courseId?: number;
  }

  interface dataType {
    data: {
      fileName: string;
      path: string;
      size: number;
    }[];
  }
  const [rensData, setResponsData] = React.useState<dataType>();
  const submit = (data: dataFormData): void => {
    if (!rensData || !rensData.data[0]) {
      message.error("Faylni yuklang, iltimos!");
      return;
    }

    CreateMutate(
      {
        title: data?.title,
        courseId: 0,
        attachment: {
          size: rensData?.data[0]?.size,
          url: rensData?.data[0]?.path,
          origName: rensData?.data[0]?.fileName,
        },
      },
      {
        onSuccess: () => {
          onCancel();
          client.invalidateQueries({ queryKey: ["get-all-data"] });
          message.success("Success");
        },
        onError: () => {
          message.error("Error");
        },
      }
    );
  };

  const handleFileUpload = (file: any) => {
    const formData = new FormData();
    formData.append("files", file.file);

    fileMutate(formData, {
      onSuccess: (res) => {
        setResponsData(res);
        message.success("File uploaded successfully!");
        file.onSuccess?.();
      },
      onError: (err) => {
        message.error("File upload failed.");
        file.onError?.(err);
      },
    });
  };

  return (
    <>
      <Form layout="vertical" onFinish={submit}>
        <div style={{ marginBottom: "80px" }}>
          <Form.Item
            name={"title"}
            label={"Kurs"}
            rules={[{ required: true, message: "Kursni tanlang" }]}
          >
            <Input type="text" />
          </Form.Item>
        </div>
        <div style={{ marginTop: "-20px", marginBottom: "-20px" }}>
          <Form.Item
            name={"courseId"}
            label="Nomi"
            rules={[{ required: true, message: "Nomini kiriting" }]}
          >
            <Input type="number" />
          </Form.Item>
        </div>
        <Upload
          customRequest={handleFileUpload}
          showUploadList={true}
          maxCount={1}
          accept=".jpg,.png,.doc,.docx"
          listType="text"
        >
          <Button>Faylni yuklash</Button>
        </Upload>
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
        >
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Saqlash
          </Button>
        </div>
      </Form>
    </>
  );
};
