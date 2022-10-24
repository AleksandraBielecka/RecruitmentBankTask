import React, { useState } from "react";
import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import CustomInput from "../components/CustomInput";
import Button from "react-bootstrap/Button";
import axios from "axios";

interface IForm {
  amount: number;
  account: number;
  address: string;
  description: string;
  beneficiary: string;
}

interface IFormStatus {
  message: string;
  type: string;
}

interface IFormStatusProps {
  [key: string]: IFormStatus;
}

const formStatusProps: IFormStatusProps = {
  success: {
    message: "Added successfully.",
    type: "success",
  },
  error: {
    message: "Something went wrong. Please try again.",
    type: "error",
  },
};

interface IProps {
  setRefreshList: (refresh: boolean) => void;
}

const TransactionForm: React.FC<IProps> = ({ setRefreshList }) => {
  const [displayFormStatus, setDisplayFormStatus] = useState(false);
  const [formStatus, setFormStatus] = useState<IFormStatus>({
    message: "",
    type: "",
  });

  const createNewTransaction = async (data: IForm) => {
    axios
      .post("http://localhost:3000/transactions", {
        amount: data.amount,
        account: `PL${data.account}`,
        address: data.address,
        description: data.description,
        beneficiary: data.beneficiary,
        date: new Date(),
      })
      .then((resp) => {
        setFormStatus(formStatusProps.success);
        setRefreshList(true);
        setDisplayFormStatus(true);
      })
      .catch((error) => {
        setFormStatus(formStatusProps.error);
        setDisplayFormStatus(true);
      });
  };

  return (
    <div>
      <Formik
        initialValues={{
          amount: 0,
          account: 0,
          address: "",
          description: "",
          beneficiary: "",
        }}
        onSubmit={(values: IForm, { resetForm }) => {
          createNewTransaction(values);
          resetForm();
        }}
        validationSchema={Yup.object().shape({
          amount: Yup.number().min(1).required("please enter valid amount"),
          account: Yup.number()
            .min(0.01)
            .required("please enter valid account number"),
          address: Yup.string().required("please enter address"),
          description: Yup.string().required("please enter description"),
          beneficiary: Yup.string().required("please enter beneficiary"),
        })}
      >
        {(props: FormikProps<IForm>) => {
          const {
            values,
            touched,
            errors,
            handleChange,
            isSubmitting,
            resetForm,
          } = props;
          return (
            <Form noValidate className="boxWrapper" data-testid="transaction-form">
              <h4>Add new transaction</h4>

              <CustomInput
                name="amount"
                label="Amount"
                value={values.amount}
                type="number"
                onChange={handleChange}
                isValid={touched.amount && !errors.amount}
                isInvalid={!!errors.amount}
                styles="formInput"
              />
              <p className="errorMsg">{errors.amount}</p>
              <CustomInput
                name="beneficiary"
                label="Beneficiary"
                value={values.beneficiary}
                type="text"
                onChange={handleChange}
                isValid={touched.beneficiary && !errors.beneficiary}
                isInvalid={!!errors.beneficiary}
                styles="formInput"
              />
              <p className="errorMsg">{errors.beneficiary}</p>

              <CustomInput
                name="account"
                label="Account number"
                value={values.account}
                type="number"
                onChange={handleChange}
                isValid={touched.account && !errors.account}
                isInvalid={!!errors.account}
                styles="formInput"
              />
              <p className="errorMsg">{errors.account}</p>
              <CustomInput
                name="address"
                label="Address"
                value={values.address}
                type="text"
                onChange={handleChange}
                isValid={touched.address && !errors.address}
                isInvalid={!!errors.address}
                styles="formInput"
              />
              <p className="errorMsg">{errors.address}</p>

              <CustomInput
                name="description"
                label="Description"
                value={values.description}
                type="text"
                onChange={handleChange}
                isValid={touched.description && !errors.description}
                isInvalid={!!errors.description}
                styles="formInput"
              />
              <p className="errorMsg">{errors.description}</p>

              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={isSubmitting}
                className="custom-btn"
              >
                Submit
              </Button>
              {displayFormStatus && (
                <div className="formStatus">
                  {formStatus.type === "error" ? (
                    <p style={{ color: "red" }}>{formStatus.message}</p>
                  ) : formStatus.type === "success" ? (
                    <p style={{ color: "green" }}>{formStatus.message}</p>
                  ) : null}
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default TransactionForm;
