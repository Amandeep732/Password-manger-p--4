import React from "react";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
uuidv4();

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  const showPassword = () => {
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/eyecross.png";
      passwordRef.current.type = "text";
    }
  };
  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);
  const copyText = (text) => {
    toast("Copied to clipboard!");
    navigator.clipboard.writeText(text);
  };

  const savePassword = () => {
    if(form.site.length <= 3 && form.password.length  <= 3 && form.username.length  <= 3){
      toast("Minimum Characters is 3");
    }
   else  if(form.site.length > 3 && form.password.length  > 3 && form.username.length  > 3){
    setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    localStorage.setItem(
      "passwords",
      JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
    );
    setform({ site: "", username: "", password: "" });
    toast("Password Saved!");
  }
}
  const deletePassword = (id) => {
    //console.log(`this id is  ${id}`)
    let c = confirm("Do you Really Want to Delete This Password");
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
    }
    toast("Password Deleted!");
  };
  const editInputs = (id) => {
    setform(passwordArray.filter((i) => i.id === id)[0]);
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
    console.log("1", passwordArray);
    console.log("2", form);
    // localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id !== id)));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-[100vh] w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

      {/* container first */}
      <div className="First  md:mycontainer ">
        <h1 className="text-center text-3xl font-bold">
          <span className="text-green-600">&lt;</span>
          Pass
          <span className="text-green-600">OP/&gt;</span>
        </h1>
        <p className="text-green-950 font-semibold  text-center ">
          Your own password Manager{" "}
        </p>

        {/* inputs container */}

        <div className="inputs flex flex-col mx-4  text-white  items-center">
          <input
            onChange={handleChange}
            className="rounded-full px-3 text-black my-3 p-1 border border-green-500 w-full"
            placeholder="Enter Website URL"
            type="text"
            value={form.site}
            name="site"
          />
          <div className="flex w-full md:gap-8  max-[1000px]:flex-col   ">
            <input
              onChange={handleChange}
              className="rounded-full px-3 text-black my-3 p-1 border border-green-500  w-full "
              type="text"
              placeholder="Enter username"
              value={form.username}
              name="username"
            />

            <div className="relative  max-[1000px]:flex-col">
              <input
                ref={passwordRef}
                onChange={handleChange}
                className="rounded-full px-3 max-[1000px]:w-full  text-black my-3 p-1 border border-green-500 "
                type="password"
                placeholder="Enter Password"
                name="password"
                value={form.password}
              />
              <span
                onClick={showPassword}
                className="absolute right-3 text-black bottom-5 w-[17px] cursor-pointer"
              >
                <img ref={ref} className="" src="icons/eye.png" alt="eye" />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="bg-green-600 my-4 border border-green-900 w-fit px-5 text-sm gap-1 rounded-full py-1 flex justify-center items-center text-black font-semibold"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords">
          <h1 className="font-bold text-2xl my-2 ml-2 ">Your Passwords</h1>
          {passwordArray.length === 0 && <div>No Passwords to Show</div>}
          {passwordArray.length != 0 && (
            <table className="md:w-full rounded-md overflow-hidden mx-2">
              <thead className="bg-green-600">
                <tr>
                  <th className="py-2 max-[900px]:w-fit">Website</th>
                  <th className="py-2  max-[900px]:w-fit">Password</th>
                  <th className="py-2  max-[900px]:w-fit">Actions</th>
                  <th className="py-2  max-[900px]:w-fit">Holder</th>
                </tr>
              </thead>
              <tbody>
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center  py-2 border border-white">
                        <a className="break-all" href={item.site} target="_blank">
                          {item.site}
                        </a>
                        <lord-icon
                          style={{
                            width: "25px",
                            height: "25px",
                            paddingTop: "10px",
                            paddingLeft: "6px",
                            cursor: "pointer",
                          }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover"
                          onClick={() => {
                            copyText(item.site);
                          }}
                        ></lord-icon>
                      </td>
                      <td className="text-center  py-2 border border-white">
                        {item.username}
                        <lord-icon
                          style={{
                            width: "25px",
                            height: "25px",
                            paddingTop: "10px",
                            paddingLeft: "6px",
                            cursor: "pointer",
                          }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover"
                          onClick={() => {
                            copyText(item.username);
                          }}
                        ></lord-icon>
                      </td>
                      <td className="text-center  py-2 border border-white">
                        {item.password}
                        <lord-icon
                          style={{
                            width: "25px",
                            height: "25px",
                            paddingTop: "10px",
                            paddingLeft: "6px",
                            cursor: "pointer",
                          }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover"
                          onClick={() => {
                            copyText(item.password);
                          }}
                        ></lord-icon>
                      </td>
                      {/* Actions tan buttons  */}
                      <td className="text-center py-2 border border-white">
                        <span className="cursor-pointer mx-1">
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            style={{ width: "20px", height: "20px" }}
                            onClick={() => {
                              editInputs(item.id);
                            }}
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ width: "20px", height: "20px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        {/* ends div */}
      </div>
    </>
  );
};

export default Manager;
