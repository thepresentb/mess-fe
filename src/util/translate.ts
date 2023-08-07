import { useTranslation } from "react-i18next"

const getTransId: (statusCode: number) => string = (statusCode: number) => {
  return `response.${statusCode}`
}

export { getTransId }