import { Button, Flex, Form, Input, message, Typography } from "antd";
import { useLogin } from "../../Service/Mutation/useLogin";
import { useLoginDataType } from "../../Service/Mutation/useLoginDataType";
import { useNavigate } from "react-router-dom";
import { saveState } from "../../Config/storage";
import najotImg from "../../assets/najot-talim.png";
import { NajotIcon } from "../../assets/icons/najot-icon";

export const Login = () => {
  const navigate = useNavigate();
  const { mutate } = useLogin();
  const submit = (data: useLoginDataType) => {
    mutate(data, {
      onSuccess: (res) => {
        saveState("Token", res.data);
        navigate("/app", { replace: true });
        message.success("welcome");
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };
  return (
    <>
      <Flex gap={"80px"}>
        <div
          style={{
            height: "990px",
            overflowY: "hidden",
            width: "600px",
          }}
        >
          <img
            style={{ width: "100%", height: "100%" }}
            src={najotImg}
            alt="#"
          />
        </div>
        <div>
          <div style={{ marginBottom: "120px", marginTop: "60px" }}>
            <NajotIcon />
          </div>
          <div>
            <Typography.Title
              style={{
                fontWeight: "600",
                fontSize: "32px",
                lineHeight: "150%",
                color: "#000",
              }}
              level={3}
            >
              Tizimga kirish
            </Typography.Title>
          </div>
          <Form style={{ width: "380px" }} onFinish={submit}>
            <div style={{ marginBottom: "100px" }}>
              <Form.Item
                name={"login"}
                label={"Login"}
                layout="vertical"
                rules={[{ required: true, message: "login kiriting" }]}
              >
                <Input
                  size="large"
                  placeholder="Loginni kiriting"
                  autoComplete="off"
                />
              </Form.Item>
            </div>
            <div style={{ marginTop: "-30px", marginBottom: "100px" }}>
              <Form.Item
                rules={[{ required: true, message: "parolni kiriting" }]}
                name={"password"}
                label={"Parol"}
                layout="vertical"
              >
                <Input.Password size="large" autoComplete="off" />
              </Form.Item>
            </div>
            <div style={{ marginTop: "-20px" }}>
              <Form.Item>
                <Button
                  style={{ width: "100%" }}
                  htmlType="submit"
                  type="primary"
                >
                  Kirish
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </Flex>
    </>
  );
};
