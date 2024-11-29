import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./Layout/main-layout";
import { Login } from "./Pages/Login";
import { Router } from "./Router/router";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<MainLayout />}>
          {Router.map(({ id, path, component: Element }) => (
            <Route index={path ? false : true} key={id} element={<Element />} />
          ))}
        </Route>
      </Routes>
    </>
  );
}

export default App;
