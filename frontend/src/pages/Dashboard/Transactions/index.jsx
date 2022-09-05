import useActiveHeaderTitleStore from "@/store/activeHeaderTitle";
import useActiveNav from "@/store/activeNav";
import Transactions from "@/components/Transactions";
import { useEffect } from "react";

function TransactionsPage() {
  const setActiveHeaderTitle = useActiveHeaderTitleStore(
    (state) => state.setActiveHeaderTitle
  );
  const setActiveNav = useActiveNav((state) => state.setActiveNav);

  useEffect(() => {
    setActiveNav("transactions");
    setActiveHeaderTitle("Transactions");
  }, []);

  return <Transactions />;
}

export default TransactionsPage;
