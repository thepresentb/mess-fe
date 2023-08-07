import { ToastContainer, toast } from "react-toastify"
import { PopUpConfirm } from "./PopUpConfirm"
import { Redirect } from "react-router";
import { useSelector } from "react-redux";
import { IRootState } from "../../../redux/rootState";
import { useEffect, useState } from "react";
import { InputCommon } from "./InputCommon";
import { t } from "i18next";
import { useDispatch } from "react-redux";
import { authAction } from "../authSlice";
import { getTransId } from "../../../util/translate";
import toastConfig from "../../../util/toastifyConfig";

export const Register = () => {
  if (localStorage.getItem('token')) {
    return <Redirect to={'/chat'} />
  }

  const dispatch = useDispatch();
  const { isLogging, status } = useSelector((state: IRootState) => state.auth);

  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "male",
    phone: "",
    dateOfBirth: "",
  });

  const inputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(authAction.register(userInfo));
  };

  const inputList = [
    [{
      name: 'username',
      lable: t("auth.username"),
      type: 'text',
    },
    {
      name: 'email',
      lable: t("auth.email"),
      type: 'email',
    }
    ],
    [{
      name: 'firstName',
      lable: t("auth.firstName"),
      type: 'text',
    },
    {
      name: 'lastName',
      lable: t("auth.lastName"),
      type: 'text',
    }],
    [{
      name: 'password',
      lable: t("auth.password"),
      type: 'password',
    },
    {
      name: 'confirmPassword',
      lable: t("auth.confirmPassword"),
      type: 'password',
    }],
    {
      name: 'phone',
      lable: t("auth.phone"),
      type: 'text',
    },
    {
      name: 'dateOfBirth',
      lable: t("auth.dateOfBirth"),
      type: 'date',
    }
  ]

  useEffect(() => {
    if (status && isLogging === false) {
      toast.error(t(getTransId(status)), toastConfig)
    }
  }, [isLogging])



  return (
    <>
      <ToastContainer />
      <PopUpConfirm userInfo={userInfo} />
      <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
        <div
          className="flex flex-col overflow-hidden bg-white rounded-md shadow-[0_0_50px_#ccc] max md:flex-row md:flex-1 lg:max-w-screen-lg"
        >
          <div
            className="p-4 py-6 text-white bg-green-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly"
          >
            <div className="my-3 text-4xl font-bold tracking-wider text-center">
              <a href="#">SONIC</a>
            </div>
            <p className="mt-6 font-normal text-center text-white opacity-70 md:mt-0">
              {t("auth.lable")}
            </p>
            <p className="flex flex-col items-center justify-center mt-10 text-center">
              <span>{t("auth.haveAccount")}</span>
              <a href="/login" className="underline">{t("auth.loginNow")}</a>
            </p>
            <p className="mt-6 text-sm text-center text-white opacity-70">
              {t("auth.term.des1")} <a href="#" className="underline">{t("auth.term.des2")}</a> {t("auth.term.des3")} <a href="#" className="underline">{t("auth.term.des4")}</a>
            </p>
          </div>
          <div className="p-5 bg-white md:flex-1">
            <h3 className="my-4 text-2xl font-semibold text-gray-700 text-center">{t("auth.register")}</h3>
            <form action="#" onSubmit={handleSubmit} className="flex flex-col space-y-5">
              {inputList.map((item) => {
                if (Array.isArray(item)) {
                  return (<div className="flex" key={item[0].name}>
                    <InputCommon key={item[0].name} name={item[0].name} lable={item[0].lable} onChange={inputChange} type={item[0].type} className="mr-4" />
                    <InputCommon key={item[1].name} name={item[1].name} lable={item[1].lable} onChange={inputChange} type={item[1].type} />
                  </div>)
                } else {
                  return <InputCommon key={item.name} name={item.name} lable={item.lable} onChange={inputChange} type={item.type} />
                }
              })}
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <label htmlFor='gender' className="text-sm font-semibold text-gray-500">{t("auth.sex")}</label>
                </div>
                <select name="gender" id="gender" className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 appearance-none" value={userInfo.gender} onChange={inputChange}>
                  <option value="male">{t("auth.male")}</option>
                  <option value="female">{t("auth.female")}</option>
                </select>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-green-500 rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                >
                  {isLogging ? "..." : t("auth.register")}
                </button>
              </div>
            </form>
          </div>
        </div >
      </div >
    </>
  )
}
