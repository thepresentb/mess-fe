import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { IRootState } from '../../../redux/rootState'
import { t } from 'i18next';
import { authApi } from '../../../api/authApi';
import { toast } from 'react-toastify';
import toastConfig from '../../../util/toastifyConfig';
import { getTransId } from '../../../util/translate';
import { useDispatch } from 'react-redux';
import { authAction } from '../authSlice';

interface PopUpConfirmI {
  userInfo?: {
    username: string,
    password: string
  },
}

export const PopUpConfirm = ({ userInfo }: PopUpConfirmI) => {
  const { isLogging, status } = useSelector((state: IRootState) => state.auth);
  const [showModal, setShowModal] = useState<boolean>(false);
  const inputCodeRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    console.log('handleSubmit', inputCodeRef.current?.value);
    if (inputCodeRef.current?.value.length !== 6) toast.error(t("auth.notEnoughLength"), toastConfig)
    if (userInfo && inputCodeRef.current?.value) {
      const result = await authApi.verifyCode({ username: userInfo.username, code: inputCodeRef.current?.value });
      if (result.statusCode !== 200) {
        toast.error(t(getTransId(result.statusCode)), toastConfig)
      } else {
        dispatch(authAction.login(userInfo));
      }
    }
  }

  useEffect(() => {
    if (status === 406) {
      setShowModal(true);
    }
  }, [isLogging])

  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {t("auth.verifyEmail")}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <p className="mt-4 mb-8 text-slate-500 text-lg leading-relaxed">
                    {t("auth.verifyEmailDes")}
                  </p>
                  <div className="flex items-center border-b border-teal-500 py-2">
                    <input ref={inputCodeRef} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="123456" />
                    <button onClick={handleSubmit} className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-6 rounded" type="button">
                      {t("auth.confirmBtn")}
                    </button>
                    <button className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button">
                      {t("auth.recieveCode")}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-end p-4 rounded-b">
                  <button
                    className="text-green-500 background-transparent font-bold px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    {t("auth.loginWithDefferent")}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-80 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}</>
  )
}
