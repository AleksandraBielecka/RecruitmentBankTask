import React from "react";
import Table from "react-bootstrap/Table";
import moment from "moment";
import { IoTrashOutline } from "react-icons/io5";
import axios from "axios";

interface IList {
  list: Array<{
    id: number;
    amount: number;
    beneficiary: string;
    account: string;
    address: string;
    date: string;
    description: string;
  }>;
  setRefreshList: (refresh: boolean) => void;
  setModal: (modal: {
    title: string;
    message: string;
    showModal: boolean;
  }) => void;
}

const TransactionsTable: React.FC<IList> = ({
  list,
  setRefreshList,
  setModal,
}) => {
  async function removeTransaction(id: number) {
    axios
      .delete(`http://localhost:3000/transactions/${id}`)
      .then((resp) => {
        setRefreshList(true);
        let newModal = {
          title: "Success",
          message: "The transaction was successfully deleted",
          showModal: true,
        };
        setModal(newModal);
      })
      .catch((error) => {
        let newModal = {
          title: "Error",
          message: error.message,
          showModal: true,
        };
        setModal(newModal);
      });
  }

  return (
    <div>
      <Table
        responsive="lg"
        className="customTable table table-striped table-sm"
      >
        <thead>
          <tr>
            <th>Id</th>
            <th>Amount</th>
            <th>Beneficiary</th>
            <th>Account</th>
            <th>Address</th>
            <th>Date</th>
            <th>Description</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {list?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.amount}</td>
              <td>{item.beneficiary}</td>
              <td>{item.account}</td>
              <td>{item.address}</td>
              <td>{moment(item.date).format("DD/MM/YYYY hh:mm")}</td>
              <td>{item.description}</td>
              <td>
                <IoTrashOutline onClick={() => removeTransaction(item.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TransactionsTable;
