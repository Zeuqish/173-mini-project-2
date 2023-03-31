import { useState, useEffect } from "react";

// Components
import Navbar from "./components/Navbar";
import { addBalanceCounterpartyOperation, addBalanceOwnerOperation, allowRevertFundsOperation, claimCounterpartyOperation, claimOwnerOperation, counterpartyAllowRevertOperation, ownerAllowRevertOperation, revertFundsOperation } from "./utils/operation";
import { fetchStorage } from "./utils/tzkt";
import { getAccount } from "./utils/wallet";

const App = () => {
  // Players holding lottery tickets
  const [balanceOwner, setBalanceOwner] = useState(0);
  const [balanceCounterParty, setBalanceCounterParty] = useState(0);
  const [loading, setLoading] = useState(false);
  const [owner, setOwner] = useState("");
  const [counterparty, setCounterparty] = useState("");
  const [admin, setAdmin] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");
  const [allowRevertAdmin, setAllowRevertAdmin] = useState(false);
  const [ownerAllowRevert, setOwnerAllowRevert] = useState(false);
  const [counterpartyAllowRevert, setCounterpartyAllowRevert] = useState(false);

  // Set players and tickets remaining
  useEffect(() => {
    (async () => {
      const storage = await fetchStorage()
      const account = await getAccount();
      setCurrentAccount(account);
      setBalanceOwner(storage.balanceOwner);
      setBalanceCounterParty(storage.balanceCounterparty);
/*       setOwner("tz1KxgFc6knZgc5gipvFqqT59JYMi8o63VdL");
      setCounterparty("tz1NRpa79kAY3jqvL9sSMZyEBGYn7mKwAgBS"); */
      setOwner(storage.owner);
      setCounterparty(storage.counterparty);
      setAdmin(storage.admin);
      setAllowRevertAdmin(storage.allowRevertAdmin);
      setOwnerAllowRevert(storage.ownerAllowRevert);
      setCounterpartyAllowRevert(storage.counterpartyAllowRevert);
    })();
  }, []);

  const onAddBalanceOwner = async () => {
    try {
      setLoading(true);
      await addBalanceOwnerOperation();
      alert("Transaction successful");
    }
    catch (err) {
      throw err;
    }
    setLoading(false)
  }

  const onAddBalanceCounterparty = async () => {
    try {
      setLoading(true);
      await addBalanceCounterpartyOperation();
      alert("Transaction successful");
    }
    catch (err) {
      throw err;
    }
    setLoading(false)
  }

  const onClaimOwner = async () => {
    try {
      setLoading(true);
      await claimOwnerOperation();
      alert("Transaction successful");
    }
    catch (err) {
      throw err;
    }
    setLoading(false)
  }

  const onClaimCounterparty = async () => {
    try {
      setLoading(true);
      await claimCounterpartyOperation();
      alert("Transaction successful");
    }
    catch (err) {
      throw err;
    }
    setLoading(false)
  }

  const onAllowRevertFunds = async () => {
    try {
      setLoading(true);
      await allowRevertFundsOperation();
      alert("Transaction successful");
    }
    catch (err) {
      throw err;
    }
    setLoading(false)
  }

  const onOwnerAllowRevert = async () => {
    try {
      setLoading(true);
      await ownerAllowRevertOperation();
      alert("Transaction successful");
    }
    catch (err) {
      throw err;
    }
    setLoading(false)
  }

  const onCounterpartyAllowRevert = async () => {
    try {
      setLoading(true);
      await counterpartyAllowRevertOperation();
      alert("Transaction successful");
    }
    catch (err) {
      throw err;
    }
    setLoading(false)
  }

  const onRevertFunds = async () => {
    try {
      setLoading(true);
      await revertFundsOperation();
      alert("Transaction successful");
    }
    catch (err) {
      throw err;
    }
    setLoading(false)
  }
  return (
    <div className="h-100">
      <Navbar />
      <div className="d-flex flex-column justify-content-center align-items-center h-100">
        <div className="py-1"> <h3> Owner Funds in Escrow: {balanceOwner} mutez</h3></div>
        <div className="py-1"><h3>Counterparty Funds in Escrow: {balanceCounterParty} mutez</h3></div>
        <div className="py-1"><h3>Total Funds in Escrow: {parseInt(balanceOwner) + parseInt(balanceCounterParty)} mutez</h3></div>
        {ownerAllowRevert ? (
            <div className="py-1">Owner has agreed to revert.</div>
          ) : (<div></div>)
        }
        {counterpartyAllowRevert ? (
           <div className="py-1">Counterparty has agreed to revert.</div>
          ) : (<div></div>)
        }
        <div className="py-4">
          {parseInt(balanceOwner) === 0 && currentAccount === owner ? (
              <button onClick={onAddBalanceOwner} className="btn btn-primary btn-lg">
                {loading ? "Transaction Processing..." : "Deposit Owner Funds"}
              </button>
            ) : (
              <button disabled={true} className="btn btn-success btn-lg">
                {currentAccount === counterparty ? "Not Owner" : "Owner Funds Deposited"}
              </button>
            )
          }
          {parseInt(balanceCounterParty) === 0 && currentAccount === counterparty ? (
              <button onClick={onAddBalanceCounterparty} className="btn btn-primary btn-lg">
                {loading ? "Transaction Processing..." : "Deposit Counterparty Funds"}
              </button>
            ) : (
              <button disabled={true} className="btn btn-success btn-lg">
                {currentAccount === owner ? "Not Counterparty" : "Counterparty Funds Deposited"}
              </button>
            )
          }
        </div>
        
        
        {parseInt(balanceOwner) !== 0  && parseInt(balanceCounterParty) !== 0 && currentAccount === owner ? (
            <button onClick={onClaimOwner} className="btn btn-primary btn-lg">
              {loading ? "Transaction Processing..." : "Send All Funds to Owner"}
            </button>
          ) : (<div></div>)
        }

        {parseInt(balanceCounterParty) !== 0  && parseInt(balanceOwner) !== 0 && currentAccount === counterparty ? (
            <button onClick={onClaimCounterparty} className="btn btn-primary btn-lg">
              {loading ? "Transaction Processing..." : "Send All Funds to Counterparty"}
            </button>
          ) : (<div></div>)
        }

        {currentAccount === admin && !allowRevertAdmin ? (
            <button onClick={onAllowRevertFunds} className="btn btn-primary btn-lg">
              {loading ? "Transaction Processing..." : "Allow Parties to Revert (Admin)"}
            </button>
          ) : (<div></div>)
        }

        {currentAccount === owner && allowRevertAdmin && !ownerAllowRevert ? (
            <button onClick={onOwnerAllowRevert} className="btn btn-primary btn-lg">
              {loading ? "Transaction Processing..." : "Agree To Withdraw Escrow (Owner)"}
            </button>
          ) : (<div></div>)
        } 
        {currentAccount === counterparty && allowRevertAdmin && !counterpartyAllowRevert ? (
            <button onClick={onCounterpartyAllowRevert} className="btn btn-primary btn-lg">
              {loading ? "Transaction Processing..." : "Agree To Withdraw Escrow (Counterparty)"}
            </button>
          ) : (<div></div>)
        }
        {currentAccount === admin && allowRevertAdmin && ownerAllowRevert && counterpartyAllowRevert ? (
            <button onClick={onRevertFunds} className="btn btn-primary btn-lg">
              {loading ? "Transaction Processing..." : "Return All Escrow Funds (Admin)"}
            </button>
          ) : (<div></div>)
        }

      </div>
    </div>
  );
};

export default App;
