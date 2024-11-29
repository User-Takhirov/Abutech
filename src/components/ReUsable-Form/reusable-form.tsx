import { Button, Form, Input, Upload } from "antd";
import React from "react";
import { ReusableFormProps } from "../DataTypes/data-types";
export const ReusableForm: React.FC<ReusableFormProps> = ({
  submit,
  handleFileUpload,
  onCancel,
}) => {
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
