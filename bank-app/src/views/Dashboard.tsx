import React, {  useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Balance from "./Balance";
import Filters from "./Filters";
import TransactionForm from "./TransactionForm";
import TransactionsTable from "./TransactionsTable";
import Spinner from "react-bootstrap/Spinner";
import "./styles.css";
import CustomModal from "../components/CustomModal";
import CustomPagination from "../components/CustomPagination";

interface IList {
  id: number;
  amount: number;
  beneficiary: string;
  account: string;
  address: string;
  date: string;
  description: string;
}

const Dashboard = () => {
  const [transactionsList, setTransactionsList] = useState<IList[]>([]);
  const [sum, setSum] = useState(0);
  const [filteredList, setFilteredList] = useState<IList[]>([]);
  const [refreshList, setRefreshList] = useState<boolean>(false);
  const [modal, setModal] = useState({
    title: "",
    message: "",
    showModal: false,
  });
  const [page, setPage] = useState<number>(0);
  const [hidePagination, setHidePagination] = useState<boolean>(false);

  const itemsPerPage = 20;

  useEffect(() => {
    getTransactions();
  }, []);

  useEffect(() => {
    if (refreshList) {
      getTransactions();
    }
  }, [refreshList]);

  async function getTransactions() {
    setRefreshList(false);

    try {
      const response = await fetch("http://localhost:3000/transactions", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      setTransactionsList(result);
      setFilteredList(result);

      setFilteredList(result.slice(0, 20));
      setPage(0);
      let maxP = Math.ceil(result.length / 20).toFixed();
      var max = parseFloat(maxP);

      let sum = result.reduce((amountSum: number, item: { amount: number }) => {
        return amountSum + item.amount;
      }, 0);
      setSum(
        result.reduce((amountSum: number, item: { amount: number }) => {
          return amountSum + (item.amount ?? 0);
        }, 0)
      );
      return result;
    } catch (error) {
      if (error instanceof Error) {
        console.log("error message: ", error.message);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  }

  const onFilterSearch = (value?: string) => {
    let oldList = transactionsList;
    if (value && value.length > 0) {
      setHidePagination(true);
      setFilteredList(
        oldList.filter((x) =>
          x.beneficiary.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredList(transactionsList);
      setHidePagination(false);
      fetchMoreData(1);
    }
  };

  const fetchMoreData = (nextPage: number) => {
    debugger;
    var list = transactionsList;
    var pagedList = list.slice(
      (nextPage - 1) * itemsPerPage,
      (nextPage - 1) * itemsPerPage + itemsPerPage
    );
    setPage(nextPage);
    setFilteredList(pagedList);
  };

  return (
    <Container>
      <div className="balanceFiltersWrapper">
        <div className="leftSide">
          {refreshList ? (
            <Spinner animation="border" />
          ) : sum ? (
            <Balance sum={sum} />
          ) : null}
          <Filters handleSearch={onFilterSearch} />
        </div>
        <TransactionForm setRefreshList={setRefreshList} />
      </div>
      <div>
        {refreshList ? (
          <Spinner animation="border" />
        ) : (
          <div>
            <TransactionsTable
              list={filteredList}
              setRefreshList={setRefreshList}
              setModal={setModal}
            />
            {!hidePagination && (
              <CustomPagination
                total={transactionsList.length}
                itemsPerPage={itemsPerPage}
                currentPage={page}
                onPageChange={(page) => fetchMoreData(page)}
              />
            )}
          </div>
        )}
      </div>
      <CustomModal
        title={modal.title}
        message={modal.message}
        showModal={modal.showModal}
      />
    </Container>
  );
};

export default Dashboard;
