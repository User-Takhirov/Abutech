import { useSearch } from "../../Service/Query/useSearch";
import useDebounce from "../../Config/useDebounce";
import React from "react";
export const Search = () => {
  const [input, setInput] = React.useState("");
  const debounce = useDebounce(input);
  const { data } = useSearch(debounce);

  return (
    <>
      <input
        type="search"
        className="search-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          width: "100%",
          padding: "7px 12px 7px 45px",
          cursor: "pointer",
          fontWeight: "400",
          fontSize: "19px",
          lineHeight: "150%",
          border: "2px solid red",
          outline: "none",
          backgroundColor: "#fbfbfb",
        }}
        placeholder="Qidiruv"
      />
      <div style={{ position: "relative" }}>
        {input ? (
          <div>
            {data?.data?.contracts.map((item: any) => {
              return (
                <div
                  key={item.id}
                  style={{
                    position: "absolute",
                    zIndex: 2,
                    backgroundColor: "red",
                    top: "10px",
                  }}
                >
                  <div>
                    <h1 key={item.id}>{item.title}</h1>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
